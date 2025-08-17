import { Request, Response } from "express";
import { IAdminRentCarUseCase } from "../../../../domain/usecaseInterface/admin/servicesUsecaseInterfaces/interface.adminRentCar";
import { IAdminRentCarController } from "../../../../domain/controlInterface/admin/service controller interfaces/interface.adminRentCarController";
import CustomError from "../../../../utils/common/errors/CustomError";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class AdminRentCarController implements IAdminRentCarController {
  constructor(private _adminRentCarUseCase: IAdminRentCarUseCase) {}

  async carFullDetails(req: Request, res: Response): Promise<void> {
    try {
      const carId = req.params.assetId;
      if (!carId) {
        res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "car ID required",
        });
        return;
      }
      const car = await this._adminRentCarUseCase.rentCarDetails(carId);
      res.status(statusCodes.Success).json({
        success: true,
        message: "car details fetched successfully",
        data: car,
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
