import { Request, Response } from "express";
import { IUserStudioController } from "../../../../domain/controlInterface/user/studio controller interfaces/interface.userStudioController";
import { IUserStudioUseCase } from "../../../../domain/usecaseInterface/user/services/interface.userStudioUseCase";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";

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
}
