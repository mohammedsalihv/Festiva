import { Request, Response } from "express";
import { AdminVenueUseCase } from "../../../application/use-cases/admin/adminVenue.usecase";
import CustomError from "../../../utils/common/errors/CustomError";

export class AdminVenueController {
  constructor(private adminVenueUseCase: AdminVenueUseCase) {}

  async venueDetails(req: Request, res: Response): Promise<void> {
    try {
      const venueId = req.params.assetId;
      if (!venueId) {
        res.status(500).json({
          success: false,
          message: "venue ID required",
        });
        return;
      }
      const venue = await this.adminVenueUseCase.execute(venueId);
      res.status(200).json({
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
        res.status(500).json({
          success: false,
          message: "Unexpected server error",
        });
      }
    }
  }
}
