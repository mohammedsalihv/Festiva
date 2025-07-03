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
      const venueId = req.params.assetId;
      if (!venueId) {
        res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "venue ID required",
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
          message: "Unexpected server error",
        });
      }
    }
  }
}
