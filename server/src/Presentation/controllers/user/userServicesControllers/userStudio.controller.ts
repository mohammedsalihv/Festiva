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
      const Id = req.query.assetId;

      const studioId: string | undefined =
        typeof Id === "string"
          ? Id
          : Array.isArray(Id) && typeof Id[0] === "string"
          ? Id[0]
          : undefined;

      if (!studioId) {
        res.status(400).json({
          success: false,
          message: "Invalid or missing studio Id",
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
  async filterStudios(req: Request, res: Response): Promise<void> {
    try {
      const filters = req.query;

      const studios = await this.userStudioUseCase.filterStudios(filters);

      res.status(statusCodes.Success).json({
        success: true,
        message: "Filtered studios fetched successfully",
        data: studios,
      });
    } catch (error) {
      logger.error("Error filtering studios:", error);

      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : statusMessages.serverError,
      });
    }
  }

  async sortStudios(req: Request, res: Response): Promise<void> {
    try {
      const sorts = req.query;
      const studios = await this.userStudioUseCase.sortStudios(sorts);
      res.status(200).json({
        success: true,
        message: "Sorted studios fetched successfully",
        data: studios,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Server error",
      });
    }
  }
}
