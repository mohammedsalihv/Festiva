import { Request, Response } from "express";
import { Types } from "mongoose";
import { IUserStudioController } from "../../../../domain/controlInterface/user/services interface/interface.userStudioController";
import { IUserStudioUseCase } from "../../../../domain/usecaseInterface/user/userServiceUseCaseInterfaces/interface.userStudioUseCase";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import CustomError from "../../../../utils/common/errors/CustomError";

export class UserStudioController implements IUserStudioController {
  constructor(private _userStudioUseCase: IUserStudioUseCase) {}

  async getStudios(req: Request, res: Response): Promise<void> {
    try {
      const studio = await this._userStudioUseCase.allStudios();

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
        res.status(statusCodes.forbidden).json({
          success: false,
          message: "Invalid or missing studio Id",
        });
        return;
      }
      const studio = await this._userStudioUseCase.studioDetails(studioId);
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
          message: statusMessages.serverError,
        });
      }
    }
  }
  async filterStudios(req: Request, res: Response): Promise<void> {
    try {
      const filters = req.query;
      const page = parseInt(filters.page as string) || 1;
      const limit = parseInt(filters.limit as string) || 10;
      const result = await this._userStudioUseCase.filterStudios(
        filters,
        page,
        limit
      );

      res.status(statusCodes.Success).json({
        success: true,
        message: "Filtered studios fetched successfully",
        ...result,
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
      const page = parseInt(sorts.page as string) || 1;
      const limit = parseInt(sorts.limit as string) || 10;
      const result = await this._userStudioUseCase.sortStudios(
        sorts,
        page,
        limit
      );

      res.status(statusCodes.Success).json({
        success: true,
        message: "Sorted studios fetched successfully",
        ...result,
      });
    } catch (error) {
      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : statusMessages.serverError,
      });
    }
  }
  async getHostId(assetId: string): Promise<Types.ObjectId> {
    try {
      const studioId: string | undefined =
        typeof assetId === "string"
          ? assetId
          : Array.isArray(assetId) && typeof assetId[0] === "string"
          ? assetId[0]
          : undefined;

      if (!studioId) {
        throw new CustomError("CatersId is required", statusCodes.badRequest);
      }

      const hostId = await this._userStudioUseCase.findStudioHost(studioId);
      return hostId;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        statusMessages.serverError,
        statusCodes.serverError
      );
    }
  }
}
