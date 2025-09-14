import { Request, Response } from "express";
import { IAdminStudioController } from "../../../../domain/controllerInterfaces/adminControllerInterfaces/adminServicesControllerInterfaces/interface.adminStudioController";
import { IAdminStudioUseCase } from "../../../../domain/usecaseInterfaces/adminUsecaseInterfaces/adminServicesUsecaseInterfaces/interface.adminStudioUseCase";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";
import { statusCodes } from "../../../../utils/baseUtilities/messages/constantResponses";

export class AdminStudioController implements IAdminStudioController {
  constructor(private _adminStudioUseCase: IAdminStudioUseCase) {}

  async studioFullDetails(req: Request, res: Response): Promise<void> {
    try {
      const studioId = req.params.assetId;
      if (!studioId) {
        res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "Studio ID required",
        });
        return;
      }
      const studio = await this._adminStudioUseCase.studioDetails(studioId);
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
}
