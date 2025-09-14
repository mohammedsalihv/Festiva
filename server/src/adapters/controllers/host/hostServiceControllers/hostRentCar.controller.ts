import { Request, Response } from "express";
import { IRentCar } from "../../../../domain/baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.rentCar";
import { IHostRentCarUseCase } from "../../../../domain/usecaseInterfaces/hostUsecaseInterfaces/hostServicesUsecaseInterfaces/interface.rentCarUseCase";
import { IHostRentCarController } from "../../../../domain/controllerInterfaces/hostControllerInterfaces/hostServicesControllerInterfaces/interface.hostRentCarController";
import { ILocationUseCase } from "../../../../domain/usecaseInterfaces/baseUsecaseInterfaces/baseServicesUsecaseInterfaces/interface.locationUsecase";
import ErrorHandler from "../../../../utils/baseUtilities/errors/CustomError";
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import logger from "../../../../utils/baseUtilities/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/baseUtilities/messages/constantResponses";
import { uploadAssetImages } from "../../../../utils/baseUtilities/cloudinary/uploadAssetImage";
import { assetFilesValidate } from "../../../../utils/mapping/hostMappings/assetFilesValidate";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";
import { authenticationRequest } from "../../../../domain/controllerInterfaces/baseControllerInterfaces/baseAuthenticationInterfaces/authRequest";

export interface MulterRequest extends Request {
  files?: { [fieldname: string]: Express.Multer.File[] };
  file?: Express.Multer.File;
  auth?: JwtPayload & { id: string; role?: string };
}

export class HostRentCarController implements IHostRentCarController {
  constructor(
    private _hostRentCarUseCase: IHostRentCarUseCase,
    private _locationUsecase: ILocationUseCase
  ) {}

  async addRentCarService(req: MulterRequest, res: Response): Promise<void> {
    try {
      const hostId = req.auth?.id;
      if (!hostId) {
        throw new ErrorHandler(
          statusMessages.unAuthorized,
          statusCodes.unAuthorized
        );
      }

      const newRentCar = req.body;
      const files = req.files?.["Images"] || [];
      const typeOfAsset = "rentcar";

      try {
        await assetFilesValidate({ files, typeOfAsset: typeOfAsset });
        const newLocation = await this._locationUsecase.execute(
          newRentCar.location
        );

        if (!newLocation || !newLocation._id) {
          throw new ErrorHandler(
            "Failed to create location",
            statusCodes.serverError
          );
        }
        const timestamp = Date.now();

        const imageUrls = (
          await Promise.all(
            files.map((file, i) =>
              uploadAssetImages({
                assetType: typeOfAsset,
                buffer: file.buffer,
                filename: `${typeOfAsset}_${timestamp}_${i}`,
              })
            )
          )
        ).map((img) => img.url);

        const {
          businessName,
          carName,
          rent,
          make,
          model,
          timeSlots,
          availableDates,
          color,
          fuel,
          transmission,
          seats,
          deposite,
          carFeatures,
          additionalFeatures,
          termsOfUse,
          about,
          description,
          guidelines,
          userDocument,
        } = newRentCar;

        const rentCar: IRentCar = {
          businessName,
          carName,
          rent,
          make,
          model,
          timeSlots,
          availableDates,
          color,
          fuel,
          transmission,
          seats,
          deposite,
          carFeatures,
          additionalFeatures,
          termsOfUse,
          about,
          description,
          guidelines,
          userDocument,
          Images: imageUrls,
          location: new Types.ObjectId(newLocation._id),
          host: new Types.ObjectId(hostId),
        };

        const createdRentCar = await this._hostRentCarUseCase.addRentCar(
          rentCar
        );
        res.status(statusCodes.Success).json(createdRentCar);
        return;
      } catch (error: any) {
        res
          .status(error.statusCode || statusCodes.serverError)
          .json({ message: error.message || statusMessages.serverError });
      }
    } catch (error) {
      if (error instanceof ErrorHandler) {
        logger.error(error);
        res.status(error.statusCode).json({ message: error.message });
      } else {
        logger.error(error);
        res
          .status(statusCodes.serverError)
          .json({ message: "Failed to add new rent car", error });
      }
    }
  }

  async carFullDetails(
    req: authenticationRequest,
    res: Response
  ): Promise<void> {
    try {
      const hostId = req.auth?.id;
      if (!hostId) {
        throw new ErrorHandler(
          statusMessages.unAuthorized,
          statusCodes.unAuthorized
        );
      }

      const carId = req.params.assetId;
      if (!carId) {
        res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "car ID required",
        });
        return;
      }
      const car = await this._hostRentCarUseCase.rentCarDetails(carId);
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
          message: statusMessages.serverError,
        });
      }
    }
  }
  async requestReApproval(
    req: authenticationRequest,
    res: Response
  ): Promise<void> {
    try {
      const hostId = req.auth?.id;
      if (!hostId) {
        throw new ErrorHandler(
          statusMessages.unAuthorized,
          statusCodes.unAuthorized
        );
      }

      const rentcarId = req.params.assetId;

      if (!rentcarId) {
        res.status(statusCodes.badRequest).json({
          success: false,
          message: "Car ID is required",
        });
        return;
      }

      const success = await this._hostRentCarUseCase.reApplyRentcar(rentcarId);

      if (!success) {
        res.status(statusCodes.serverError).json({
          success: false,
          message: "Car re-apply request failed",
        });
        return;
      }

      res.status(statusCodes.Success).json({
        success: true,
        message: "Car re-apply request submitted successfully",
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(statusCodes.serverError).json({
          success: false,
          message: statusMessages.serverError,
        });
      }
    }
  }

  async availability(req: authenticationRequest, res: Response): Promise<void> {
    try {
      const hostId = req.auth?.id;
      if (!hostId) {
        throw new ErrorHandler(
          statusMessages.unAuthorized,
          statusCodes.unAuthorized
        );
      }

      const rentcarId = req.params.assetId;
      const { isAvailable } = req.body;

      if (!rentcarId) {
        res.status(statusCodes.badRequest).json({
          success: false,
          message: "rent car ID is required",
        });
        return;
      }

      const success = await this._hostRentCarUseCase.updateRentcarAvailability(
        rentcarId,
        isAvailable
      );

      if (!success) {
        res.status(statusCodes.serverError).json({
          success: false,
          message: `Failed to change Rent car availability to ${
            isAvailable ? "available" : "unavailable"
          }`,
        });
        return;
      }

      res.status(statusCodes.Success).json({
        success: true,
        message: `Rent car marked as ${
          isAvailable ? "available" : "unavailable"
        } successfully`,
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(statusCodes.serverError).json({
          success: false,
          message: statusMessages.serverError,
        });
      }
    }
  }

  async deleteRequest(
    req: authenticationRequest,
    res: Response
  ): Promise<void> {
    try {
      const hostId = req.auth?.id;
      if (!hostId) {
        throw new ErrorHandler(
          statusMessages.unAuthorized,
          statusCodes.unAuthorized
        );
      }

      const rentcarId = req.params.assetId;

      if (!rentcarId) {
        res.status(statusCodes.badRequest).json({
          success: false,
          message: "rent car ID is required",
        });
        return;
      }

      const success = await this._hostRentCarUseCase.removeRentcar(rentcarId);

      if (!success) {
        res.status(statusCodes.serverError).json({
          success: false,
          message: "Error while deleting the rent car",
        });
        return;
      }

      res.status(statusCodes.Success).json({
        success: true,
        message: "rent car deleted successfully",
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(statusCodes.serverError).json({
          success: false,
          message: statusMessages.serverError,
        });
      }
    }
  }
}
