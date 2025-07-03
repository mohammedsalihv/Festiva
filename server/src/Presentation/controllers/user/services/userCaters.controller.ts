import { Request, Response } from "express";
import { IUserCatersController } from "../../../../domain/controlInterface/user/services interface/interface.userCatersController";
import { IUserCatersUseCase } from "../../../../domain/usecaseInterface/user/services/interface.userCatersUseCase";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import CustomError from "../../../../utils/common/errors/CustomError";

export class UserCatersController implements IUserCatersController {
  constructor(private userCatersUseCase: IUserCatersUseCase) {}

  async getCaters(req: Request, res: Response): Promise<void> {
    try {
      const caters = await this.userCatersUseCase.allCaters();

      if (caters.length === 0) {
        res.status(statusCodes.Success).json({
          success: true,
          message: "caters list empty",
          data: caters,
        });
        return;
      }
      res.status(statusCodes.Success).json({
        success: true,
        message: "caters fetched successfully",
        data: caters,
      });
    } catch (error) {
      logger.error("Error fetching caters:", error);

      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : statusMessages.serverError,
      });
    }
  }
  async getCatersDetails(req: Request, res: Response): Promise<void> {
    try {
      const catersId = req.params.assetId;
      if (!catersId) {
        res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "Caters ID required",
        });
        return;
      }
      const caters = await this.userCatersUseCase.catersDetails(catersId);
      res.status(statusCodes.Success).json({
        success: true,
        message: "Caters details fetched successfully",
        data: caters,
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
