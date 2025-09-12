import { Request, Response } from "express";
import { IReviewController } from "../../../../domain/controllerInterfaces/baseControllerInterfaces/baseReviewControllerInterfaces/interface.reviewController";
import { IReviewUseCase } from "../../../../domain/usecaseInterface/base/review/interface.reviewUsecase";
import { validateReviewRequest } from "../../../../types/DTO's/baseDTO's/review";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/baseUtilities/messages/constantResponses";
import logger from "../../../../utils/baseUtilities/messages/logger";
import { IUserServicesBaseController } from "../../../../domain/controllerInterfaces/userControllerInterfaces/userServicesControllerInterfaces/interface.userServicesBaseController";
import { mapReviewPayloadToIReview } from "../../../../utils/mapping/baseMappings/reviewMapper";
import { getIO } from "../../../../config/socket";
import { IHostNotificationUseCase } from "../../../../domain/usecaseInterface/host/accountUsecaseInterfaces/interface.hostNotificationUseCase";
import { AssetType } from "../../../../types/baseTypes/assetsTypes";

export class ReviewController implements IReviewController {
  constructor(
    private _reviewUsecase: IReviewUseCase,
    private _userBaseService: IUserServicesBaseController,
    private _hostNotificationUseCase: IHostNotificationUseCase
  ) {}

  async addReview(req: Request, res: Response): Promise<void> {
    try {
      const reviewPayload = validateReviewRequest(req.body);
      const receiverId = await this._userBaseService.reviewReceiver(
        reviewPayload.assetType,
        reviewPayload.assetId
      );
      const reviewData = mapReviewPayloadToIReview(reviewPayload, receiverId);
      const reviewStatus = await this._reviewUsecase.newReview(reviewData);

      if (reviewData && reviewData.receiverId) {
        await this._hostNotificationUseCase.createNotification({
          createrId: reviewData.createrId,
          receiverId: reviewData.receiverId,
          assetId: reviewData.assetId,
          assetType: reviewData.assetType as AssetType,
          status: "created",
          message: `Your ${reviewData.assetType} has received a new review.`,
        });

        const io = getIO();
        io.to(`host-${reviewData.receiverId}`).emit("new-notification", {
          assetId: reviewData.assetId,
          assetType: reviewData.assetType,
          status: "Created",
          message: `Your ${reviewData.assetType} has received a new review.`,
          createdAt: new Date(),
        });
      }

      res.status(statusCodes.Success).json({
        success: true,
        result: reviewStatus,
      });
    } catch (error: any) {
      logger.error("Review adding failed:", error);
      res.status(error.statusCode || statusCodes.serverError).json({
        success: false,
        message: error.message || statusMessages.serverError,
      });
    }
  }
}
