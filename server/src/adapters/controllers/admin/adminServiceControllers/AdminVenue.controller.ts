import { Request, Response } from "express";
import { IAdminVenueController } from "../../../../domain/controllerInterfaces/adminControllerInterfaces/adminServicesControllerInterfaces/interface.adminVenueController";
import { IAdminVenueUseCase } from "../../../../domain/usecaseInterfaces/adminUsecaseInterfaces/adminServicesUsecaseInterfaces/interface.adminVenueUseCase";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";
import { statusCodes } from "../../../../utils/baseUtilities/messages/constantResponses";


export class AdminVenueController implements IAdminVenueController {
  constructor(private _adminVenueUseCase: IAdminVenueUseCase) {}

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
      const venue = await this._adminVenueUseCase.execute(venueId);
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
