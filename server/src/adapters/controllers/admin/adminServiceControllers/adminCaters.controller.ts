import { Request, Response } from "express";
import { IAdminCatersController } from "../../../../domain/controllerInterfaces/adminControllerInterfaces/adminServicesControllerInterfaces/interface.adminCatersController";
import { IAdminCatersUseCase } from "../../../../domain/usecaseInterface/admin/servicesUsecaseInterfaces/interface.adminCatersUseCase";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";
import { statusCodes } from "../../../../utils/baseUtilities/messages/constantResponses";


export class AdminCatersController implements IAdminCatersController {
  constructor(private _adminCatersUseCase: IAdminCatersUseCase) {}

  async catersFullDetails(req: Request, res: Response): Promise<void> {
    try {
      const catersId = req.params.assetId;
      if (!catersId) {
        res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "Caters ID required",
        });
        return;
      }
      const caters = await this._adminCatersUseCase.catersDetails(catersId);
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
}
