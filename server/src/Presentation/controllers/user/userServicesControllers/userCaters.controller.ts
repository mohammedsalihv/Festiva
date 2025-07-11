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
      const Id = req.query.assetId;

      const catersId: string | undefined =
        typeof Id === "string"
          ? Id
          : Array.isArray(Id) && typeof Id[0] === "string"
          ? Id[0]
          : undefined;

      if (!catersId) {
        res.status(400).json({
          success: false,
          message: "Invalid or missing catersId",
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
  async filterCaters(req: Request, res: Response): Promise<void> {
    try {
      const filters = req.query;

      const caters = await this.userCatersUseCase.filterCaters(filters);

      res.status(statusCodes.Success).json({
        success: true,
        message: "Filtered caters fetched successfully",
        data: caters,
      });
    } catch (error) {
      logger.error("Error filtering caters:", error);
      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : statusMessages.serverError,
      });
    }
  }
 async sortCaters(req: Request, res: Response): Promise<void> {
  try {
    const sorts = req.query;
    const caters = await this.userCatersUseCase.sortCaters(sorts);
    res.status(200).json({
      success: true,
      message: "Sorted caters fetched successfully",
      data: caters,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Server error",
    });
  }
}

}
