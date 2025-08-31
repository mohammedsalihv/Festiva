import { Response } from "express";
import { authenticationRequest } from "../../../../domain/controlInterface/common/authentication/authRequest";
import { IHostReviewsController } from "../../../../domain/controlInterface/common/account/interface.hostReviewsController";
import { statusCodes, statusMessages } from "../../../../utils/common/messages/constantResponses";
import logger from "../../../../utils/common/messages/logger";
import { IHostReviewsUseCase } from "../../../../domain/usecaseInterface/host/accountUsecaseInterfaces/interface.hostReviewsUseCase";

export class HostReviewsController implements IHostReviewsController {
  constructor(private _hostReviewsUseCase: IHostReviewsUseCase) {}

  async allReviews(req: authenticationRequest, res: Response): Promise<void> {
    try {
      const hostId = req.auth!.id;

      if (!hostId) {
        res
          .status(statusCodes.forbidden)
          .json(statusMessages.unAuthorized);
        return;
      }
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as string | undefined;

      const { reviews, totalPages } =
        await this._hostReviewsUseCase.createdReviews(
          hostId,
          page,
          limit,
          status
        );

      res.status(statusCodes.Success).json({ reviews, totalPages });
    } catch (error) {
      logger.error("Error fetching all reviews:", error);
      res
        .status(statusCodes.serverError)
        .json({ message: "Failed to fetch all reviews" });
    }
  }
}
