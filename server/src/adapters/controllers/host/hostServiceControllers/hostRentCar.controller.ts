import { Request, Response } from "express";
import { IRentCar } from "../../../../domain/entities/serviceInterface/host/interface.rentCar";
import { HostRentCarUseCase } from "../../../../application/usecases/host/hostServicesUsecases/usecase.hostRentcar";
import { IHostRentCarController } from "../../../../domain/controlInterface/host/service controller interfaces/interface.hostRentCarController";
import { ILocationRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.locationRepostory";
import ErrorHandler from "../../../../utils/common/errors/CustomError";
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import { uploadAssetImages } from "../../../../utils/common/cloudinary/uploadAssetImage";
import { assetFilesValidate } from "../../../../utils/mapping/host/assetFilesValidate";
import { geocodeAddress } from "../../../../utils/common/geocoding/geocodeAddress";
import CustomError from "../../../../utils/common/errors/CustomError";
import { getSignedImageUrl } from "../../../../utils/common/cloudinary/getSignedImageUrl";

export interface MulterRequest extends Request {
  files?: { [fieldname: string]: Express.Multer.File[] };
  file?: Express.Multer.File;
  auth?: JwtPayload & { id: string; role?: string };
}

export class HostRentCarController implements IHostRentCarController {
  constructor(
    private hostRentCarUseCase: HostRentCarUseCase,
    private locationRepository: ILocationRepository
  ) {}

  async addRentCarService(req: MulterRequest, res: Response): Promise<void> {
    const hostId = req.auth?.id;
    if (!hostId) {
      throw new ErrorHandler(
        statusMessages.unAuthorized,
        statusCodes.unAuthorized
      );
    }

    try {
      const newRentCar = req.body;
      const files = req.files?.["Images"] || [];
      const typeOfAsset = "rentcar";

      try {
        await assetFilesValidate({ files, typeOfAsset: typeOfAsset });
        const fullAddress = `${newRentCar.location.houseNo}, ${newRentCar.location.street}, ${newRentCar.location.district}, ${newRentCar.location.state}, ${newRentCar.location.country}, ${newRentCar.location.zip}`;

        const { lat, lng } = await geocodeAddress(fullAddress);

        newRentCar.location.coordinates = {
          type: "Point",
          coordinates: [lng, lat],
        };

        const newLocation = await this.locationRepository.addLocation(
          newRentCar.location
        );

        if (!newLocation || !newLocation._id) {
          throw new ErrorHandler(
            "Failed to create location",
            statusCodes.serverError
          );
        }
        const timestamp = Date.now();

        const uploadedImages = await Promise.all(
          files.map((file, i) =>
            uploadAssetImages({
              assetType: typeOfAsset,
              buffer: file.buffer,
              filename: `${typeOfAsset}_${timestamp}_${i}`,
            })
          )
        );

        const imagePublicIds = uploadedImages.map((img) => img.public_id);

        const signedImageUrls = imagePublicIds.map((public_id) =>
          getSignedImageUrl(public_id)
        );

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
          Images: signedImageUrls,
          location: new Types.ObjectId(newLocation._id),
          host: new Types.ObjectId(hostId),
        };

        const createdRentCar = await this.hostRentCarUseCase.addRentCar(
          rentCar
        );
        res.status(statusCodes.Success).json(createdRentCar);
        return;
      } catch (error: any) {
        res
          .status(error.statusCode || statusCodes.serverError)
          .json({ message: error.message || "Something went wrong" });
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

  async carFullDetails(req: Request, res: Response): Promise<void> {
    try {
      const rentcarId = req.params.assetId;
      if (!rentcarId) {
        res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "car ID required",
        });
        return;
      }
      const car = await this.hostRentCarUseCase.rentCarDetails(rentcarId);
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
  async requestReApproval(req: Request, res: Response): Promise<void> {
    try {
      const rentcarId = req.params.assetId;

      if (!rentcarId) {
        res.status(statusCodes.badRequest).json({
          success: false,
          message: "Car ID is required",
        });
        return;
      }

      const success = await this.hostRentCarUseCase.reApplyRentcar(rentcarId);

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
          message: "Unexpected server error",
        });
      }
    }
  }

  async availability(req: Request, res: Response): Promise<void> {
    try {
      const rentcarId = req.params.assetId;
      const { isAvailable } = req.body;

      if (!rentcarId) {
        res.status(statusCodes.badRequest).json({
          success: false,
          message: "rent car ID is required",
        });
        return;
      }

      const success = await this.hostRentCarUseCase.updateRentcarAvailability(
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
          message: "Unexpected error during rent car status updating",
        });
      }
    }
  }

  async deleteRequest(req: Request, res: Response): Promise<void> {
    try {
      const rentcarId = req.params.assetId;

      if (!rentcarId) {
        res.status(statusCodes.badRequest).json({
          success: false,
          message: "rent car ID is required",
        });
        return;
      }

      const success = await this.hostRentCarUseCase.removeRentcar(rentcarId);

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
          message: "Unexpected error during rent car deleting",
        });
      }
    }
  }
}
