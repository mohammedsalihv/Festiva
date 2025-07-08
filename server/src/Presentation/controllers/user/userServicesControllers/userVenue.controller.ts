import { Request, Response } from "express";
import { IUserVenueController } from "../../../../domain/controlInterface/user/services interface/interface.userVenueController";
import { IUserVenueUseCase } from "../../../../domain/usecaseInterface/user/services/interface.userVenueUseCase";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import CustomError from "../../../../utils/common/errors/CustomError";

export class UserVenueController implements IUserVenueController {
  constructor(private userVenueUseCase: IUserVenueUseCase) {}

  async getVenues(req: Request, res: Response): Promise<void> {
    try {
      const venues = await this.userVenueUseCase.allVenues();

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

      const venue = await this.userVenueUseCase.venueDetails(venueId);

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
      const result = await this.userVenueUseCase.filterVenues(
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
      const result = await this.userVenueUseCase.sortVenues(sorts, page, limit);

      res.status(statusCodes.Success).json({
        success: true,
        message: "Sorted venues fetched successfully",
        ...result,
      });
    } catch (error) {
       res.status(statusCodes.serverError).json({
        success: false,
        message: error instanceof Error ? error.message : statusMessages.serverError,
      });
    }
  }
}
