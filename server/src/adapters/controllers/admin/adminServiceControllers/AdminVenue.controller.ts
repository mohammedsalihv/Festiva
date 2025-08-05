import { Request, Response } from "express";
import { IAdminVenueController } from "../../../../domain/controlInterface/admin/service controller interfaces/interface.adminVenueController";
import { AdminVenueUseCase } from "../../../../application/usecases/admin/adminServicesUsecases/usecase.adminVenue";
import CustomError from "../../../../utils/common/errors/CustomError";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";
import { getSignedImageUrl } from "../../../../utils/common/cloudinary/getSignedImageUrl";

export class AdminVenueController implements IAdminVenueController {
  constructor(private adminVenueUseCase: AdminVenueUseCase) {}

  async venueFullDetails(req: Request, res: Response): Promise<void> {
    try {
      const venueId = req.params.assetId;
      if (!venueId) {
        res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "venue ID required",
        });
        return;
      }
      const venue = await this.adminVenueUseCase.execute(venueId);
      const signedVenue = {
        ...venue,
        Images: (venue.Images ?? []).map((public_id: string) =>
          getSignedImageUrl(public_id, undefined, 800)
        ),
      };

      res.status(statusCodes.Success).json({
        success: true,
        message: "Venue details fetched successfully",
        data: signedVenue,
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
