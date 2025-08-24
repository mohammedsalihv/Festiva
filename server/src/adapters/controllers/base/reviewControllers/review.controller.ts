import { Request, Response } from "express";
import { IReviewController } from "../../../../domain/controlInterface/common/review/interface.reviewController";
import { IReviewUseCase } from "../../../../domain/usecaseInterface/base/review/interface.reviewUsecase";
import { validateReviewRequest } from "../../../../types/DTO/common/review";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import logger from "../../../../utils/common/messages/logger";
import { IUserServicesBaseController } from "../../../../domain/controlInterface/user/services interface/interface.userServicesBaseController";
import { mapReviewPayloadToIReview } from "../../../../utils/mapping/base/reviewMapper";

export class ReviewController implements IReviewController {
  constructor(
    private _reviewUsecase: IReviewUseCase,
    private _userBaseService: IUserServicesBaseController
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
