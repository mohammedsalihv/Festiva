import { Request, Response } from "express";
import { Types } from "mongoose";
import { IUserCatersController } from "../../../../domain/controlInterface/user/services interface/interface.userCatersController";
import { IUserCatersUseCase } from "../../../../domain/usecaseInterface/user/userServiceUseCaseInterfaces/interface.userCatersUseCase";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import CustomError from "../../../../utils/common/errors/CustomError";

export class UserCatersController implements IUserCatersController {
  constructor(private _userCatersUseCase: IUserCatersUseCase) {}
  async getCaters(req: Request, res: Response): Promise<void> {
    try {
      const caters = await this._userCatersUseCase.allCaters();

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
        res.status(statusCodes.forbidden).json({
          success: false,
          message: "Invalid or missing catersId",
        });
        return;
      }
      const caters = await this._userCatersUseCase.findCatersHost(catersId);
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
      const page = parseInt(filters.page as string) || 1;
      const limit = parseInt(filters.limit as string) || 10;

      const result = await this._userCatersUseCase.filterCaters(
        filters,
        page,
        limit
      );

      res.status(statusCodes.Success).json({
        success: true,
        message: "Filtered caters fetched successfully",
        ...result,
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
      const page = parseInt(sorts.page as string) || 1;
      const limit = parseInt(sorts.limit as string) || 10;

      const result = await this._userCatersUseCase.sortCaters(
        sorts,
        page,
        limit
      );

      res.status(statusCodes.Success).json({
        success: true,
        message: "Sorted caters fetched successfully",
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
      const catersId: string | undefined =
        typeof assetId === "string"
          ? assetId
          : Array.isArray(assetId) && typeof assetId[0] === "string"
          ? assetId[0]
          : undefined;

      if (!catersId) {
        throw new CustomError("CatersId is required", statusCodes.badRequest);
      }

      const hostId = await this._userCatersUseCase.findCatersHost(catersId);
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
