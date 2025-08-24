import { Request, Response } from "express";
import { Types } from "mongoose";
import { IUserVenueController } from "../../../../domain/controlInterface/user/services interface/interface.userVenueController";
import { IUserVenueUseCase } from "../../../../domain/usecaseInterface/user/userServiceUseCaseInterfaces/interface.userVenueUseCase";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import CustomError from "../../../../utils/common/errors/CustomError";

export class UserVenueController implements IUserVenueController {
  constructor(private _userVenueUseCase: IUserVenueUseCase) {}

  async getVenues(req: Request, res: Response): Promise<void> {
    try {
      const venues = await this._userVenueUseCase.allVenues();

      if (!venues) {
        res.status(statusCodes.notfound).json({
          success: false,
          message: "Venues list empty",
        });
        return;
      }

      res.status(statusCodes.Success).json({
        success: true,
        message: "Venues fetched successfully",
        data: venues,
      });
    } catch (error) {
      logger.error("Error fetching venues:", error);
      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : statusMessages.serverError,
      });
    }
  }

  async getVenueDetails(req: Request, res: Response): Promise<void> {
    try {
      const Id = req.query.assetId;

      const venueId: string | undefined =
        typeof Id === "string"
          ? Id
          : Array.isArray(Id) && typeof Id[0] === "string"
          ? Id[0]
          : undefined;

      if (!venueId) {
        res.status(statusCodes.forbidden).json({
          success: false,
          message: "Invalid or missing venueId",
        });
        return;
      }

      const venue = await this._userVenueUseCase.venueDetails(venueId);

      res.status(statusCodes.Success).json({
        success: true,
        message: "Venue details fetched successfully",
        data: venue,
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
  async filterVenues(req: Request, res: Response): Promise<void> {
    try {
      const filters = req.query;
      const page = parseInt(filters.page as string) || 1;
      const limit = parseInt(filters.limit as string) || 10;
      const result = await this._userVenueUseCase.filterVenues(
        filters,
        page,
        limit
      );

      res.status(statusCodes.Success).json({
        success: true,
        message: "Filtered venues fetched successfully",
        ...result,
      });
    } catch (error) {
      logger.error("Error filtering venues:", error);
      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : statusMessages.serverError,
      });
    }
  }

  async sortVenues(req: Request, res: Response): Promise<void> {
    try {
      const sorts = req.query;
      const page = parseInt(sorts.page as string) || 1;
      const limit = parseInt(sorts.limit as string) || 10;
      const result = await this._userVenueUseCase.sortVenues(
        sorts,
        page,
        limit
      );

      res.status(statusCodes.Success).json({
        success: true,
        message: "Sorted venues fetched successfully",
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
      const venueId: string | undefined =
        typeof assetId === "string"
          ? assetId
          : Array.isArray(assetId) && typeof assetId[0] === "string"
          ? assetId[0]
          : undefined;

      if (!venueId) {
        throw new CustomError("CatersId is required", statusCodes.badRequest);
      }

      const hostId = await this._userVenueUseCase.findVenueHost(venueId);
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
