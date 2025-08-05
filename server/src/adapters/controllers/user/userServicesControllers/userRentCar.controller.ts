import { Request, Response } from "express";
import { IUserRentCarUseCase } from "../../../../domain/usecaseInterface/user/userServiceUseCaseInterfaces/interface.userRentCarUseCase";
import { IUserRentCarController } from "../../../../domain/controlInterface/user/services interface/interface.userRentCarController";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import CustomError from "../../../../utils/common/errors/CustomError";
import { getSignedImageUrl } from "../../../../utils/common/cloudinary/getSignedImageUrl";

export class UserRentCarController implements IUserRentCarController {
  constructor(private userRentCarUseCase: IUserRentCarUseCase) {}

  async getRentCars(req: Request, res: Response): Promise<void> {
    try {
      const cars = await this.userRentCarUseCase.allRentCars();

      if (cars.length === 0) {
        res.status(statusCodes.Success).json({
          success: true,
          message: "cars list empty",
        });
        return;
      }
      const signedRentCars = cars.map((car) => ({
        ...(car.toObject?.() ?? car),
        Images: (car.Images ?? []).map((public_id: string) =>
          getSignedImageUrl(public_id, undefined, 600)
        ),
      }));
      res.status(statusCodes.Success).json({
        success: true,
        message: "cars fetched successfully",
        data: signedRentCars,
      });
    } catch (error) {
      logger.error("Error fetching cars:", error);

      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : statusMessages.serverError,
      });
    }
  }
  async getRentCarDetails(req: Request, res: Response): Promise<void> {
    try {
      const Id = req.query.assetId;

      const carId: string | undefined =
        typeof Id === "string"
          ? Id
          : Array.isArray(Id) && typeof Id[0] === "string"
          ? Id[0]
          : undefined;

      if (!carId) {
        res.status(statusCodes.forbidden).json({
          success: false,
          message: "Invalid or missing carId",
        });
        return;
      }
      const car = await this.userRentCarUseCase.rentCarDetails(carId);
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
  async filterRentCars(req: Request, res: Response): Promise<void> {
    try {
      const filters = req.query;
      const page = parseInt(filters.page as string) || 1;
      const limit = parseInt(filters.limit as string) || 10;
      const result = await this.userRentCarUseCase.filterRentCars(
        filters,
        page,
        limit
      );
      const signedRentCars = result.data.map((studio) => ({
        ...studio,
        Images: (studio.Images ?? []).map((public_id: string) =>
          getSignedImageUrl(public_id, undefined, 800)
        ),
      }));

      res.status(statusCodes.Success).json({
        success: true,
        message: "RentCars fetched successfully",
        data: signedRentCars,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
      });
    } catch (error) {
      logger.error("Error filtering rent cars:", error);

      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : statusMessages.serverError,
      });
    }
  }

  async sortRentCars(req: Request, res: Response): Promise<void> {
    try {
      const sorts = req.query;
      const page = parseInt(sorts.page as string) || 1;
      const limit = parseInt(sorts.limit as string) || 10;
      const result = await this.userRentCarUseCase.sortRentCars(
        sorts,
        page,
        limit
      );

      const signedRentCars = result.data.map((studio) => ({
        ...studio,
        Images: (studio.Images ?? []).map((public_id: string) =>
          getSignedImageUrl(public_id, undefined, 800)
        ),
      }));

      res.status(statusCodes.Success).json({
        success: true,
        message: "RentCars fetched successfully",
        data: signedRentCars,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
      });
    } catch (error) {
      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : statusMessages.serverError,
      });
    }
  }
}
