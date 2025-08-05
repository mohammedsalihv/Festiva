import { Request, Response } from "express";
import { AdminRentCarUseCase } from "../../../../application/usecases/admin/adminServicesUsecases/usecase.adminRentCar";
import { IAdminRentCarController } from "../../../../domain/controlInterface/admin/service controller interfaces/interface.adminRentCarController";
import CustomError from "../../../../utils/common/errors/CustomError";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";
import { getSignedImageUrl } from "../../../../utils/common/cloudinary/getSignedImageUrl";

export class AdminRentCarController implements IAdminRentCarController {
  constructor(private adminRentCarUseCase: AdminRentCarUseCase) {}

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
      const car = await this.adminRentCarUseCase.rentCarDetails(carId);
      const signedRentCar = {
        ...car,
        Images: (car.Images ?? []).map((public_id: string) =>
          getSignedImageUrl(public_id, undefined, 800)
        ),
      };
      res.status(statusCodes.Success).json({
        success: true,
        message: "car details fetched successfully",
        data: signedRentCar,
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
