import { Request, Response } from "express";
import { IUserStudioController } from "../../../../domain/controlInterface/user/services interface/interface.userStudioController";
import { IUserStudioUseCase } from "../../../../domain/usecaseInterface/user/services/interface.userStudioUseCase";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import CustomError from "../../../../utils/common/errors/CustomError";

export class UserStudioController implements IUserStudioController {
  constructor(private userStudioUseCase: IUserStudioUseCase) {}

  async getStudios(req: Request, res: Response): Promise<void> {
    try {
      const studio = await this.userStudioUseCase.allStudios();

      if (studio.length === 0) {
        res.status(statusCodes.Success).json({
          success: true,
          message: "studio list empty",
          data: studio,
        });
        return;
      }
      res.status(statusCodes.Success).json({
        success: true,
        message: "studios fetched successfully",
        data: studio,
      });
    } catch (error) {
      logger.error("Error fetching studio:", error);

      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : statusMessages.serverError,
      });
    }
  }

  async getStudioDetails(req: Request, res: Response): Promise<void> {
    try {
      const studioId = req.params.assetId;
      if (!studioId) {
        res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "Studio ID required",
        });
        return;
      }
      const studio = await this.userStudioUseCase.studioDetails(studioId);
      res.status(statusCodes.Success).json({
        success: true,
        message: "studio details fetched successfully",
        data: studio,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(statusCodes.serverError).json({
          success: false,
          message: "Unexpected server error",
        });
      }
    }
  }
}
