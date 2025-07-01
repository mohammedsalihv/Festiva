import { Request, Response } from "express";
import { IUserVenueController } from "../../../../domain/controlInterface/user/venues controller interfaces/interface.userVenueController";
import { IUserVenueUseCase } from "../../../../domain/usecaseInterface/user/services/interface.userVenueUseCase";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";

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
}
