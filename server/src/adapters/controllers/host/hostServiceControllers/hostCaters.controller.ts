import { IHostCatersController } from "../../../../domain/controlInterface/host/service controller interfaces/interface.hostCatersController";
import { HostCatersUseCase } from "../../../../application/usecases/host/hostServicesUsecases/usecase.hostCaters";
import { ICaters } from "../../../../domain/entities/serviceInterface/host/interface.caters";
import { IHostAssetLocationRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.hostAssetLocationRepostory";
import ErrorHandler from "../../../../utils/common/errors/CustomError";
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import { uploadAssetImages } from "../../../../utils/common/cloudinary/uploadAssetImage";
import { assetFilesValidate } from "../../../../utils/host/assetFilesValidate";
import { Request, Response } from "express";
import { geocodeAddress } from "../../../../utils/common/geocoding/geocodeAddress";
import CustomError from "../../../../utils/common/errors/CustomError";

export interface MulterRequest extends Request {
  files?: { [fieldname: string]: Express.Multer.File[] };
  file?: Express.Multer.File;
  auth?: JwtPayload & { id: string; role?: string };
}

export class HostCatersController implements IHostCatersController {
  constructor(
    private hostCatersUseCase: HostCatersUseCase,
    private hostAssetlocationRepository: IHostAssetLocationRepository
  ) {}

  async addCatersService(req: MulterRequest, res: Response): Promise<void> {
    const hostId = req.auth?.id;
    if (!hostId) {
      throw new ErrorHandler(
        statusMessages.unAuthorized,
        statusCodes.unAuthorized
      );
    }

    try {
      const newCaters = req.body;
      const files = req.files?.["Images"] || [];
      const typeOfAsset = "caters";

      try {
        await assetFilesValidate({ files, typeOfAsset });

        const fullAddress = `${newCaters.location.houseNo}, ${newCaters.location.street}, ${newCaters.location.district}, ${newCaters.location.state}, ${newCaters.location.country}, ${newCaters.location.zip}`;

        const { lat, lng } = await geocodeAddress(fullAddress);

        newCaters.location.coordinates = {
          type: "Point",
          coordinates: [lng, lat],
        };

        const newLocation = await this.hostAssetlocationRepository.addLocation(
          newCaters.location
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
          catersName,
          manpower,
          charge,
          totalAmount,
          timeSlots,
          availableDates,
          description,
          features,
          serviceTypes,
          terms,
          conditions,
          about,
        } = newCaters;

        const caters: ICaters = {
          catersName,
          manpower,
          charge,
          totalAmount,
          timeSlots,
          availableDates,
          description,
          features,
          serviceTypes,
          terms,
          conditions,
          about,
          Images: imageUrls,
          location: new Types.ObjectId(newLocation._id),
          host: new Types.ObjectId(hostId),
        };

        const createdCaters = await this.hostCatersUseCase.addCaters(caters);
        res.status(statusCodes.Success).json(createdCaters);
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
          .json({ message: "Failed to add new caters", error });
      }
    }
  }

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
      const caters = await this.hostCatersUseCase.catersDetails(catersId);
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

  async requestReApproval(req: Request, res: Response): Promise<void> {
    try {
      const catersId = req.params.assetId;

      if (!catersId) {
        res.status(statusCodes.badRequest).json({
          success: false,
          message: "Caters ID is required",
        });
        return;
      }

      const success = await this.hostCatersUseCase.reApplyCaters(catersId);

      if (!success) {
        res.status(statusCodes.serverError).json({
          success: false,
          message: "Re-apply request failed",
        });
        return;
      }

      res.status(statusCodes.Success).json({
        success: true,
        message: "Caters re-apply request submitted successfully",
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
      const catersId = req.params.assetId;
      const { isAvailable } = req.body;

      if (!catersId) {
        res.status(statusCodes.badRequest).json({
          success: false,
          message: "caters ID is required",
        });
        return;
      }

      const success = await this.hostCatersUseCase.updateCatersAvailability(catersId,isAvailable);

      if (!success) {
        res.status(statusCodes.serverError).json({
          success: false,
           message: `Failed to change caters availability to ${
            isAvailable ? "available" : "unavailable"
          }`,
        });
        return;
      }

      res.status(statusCodes.Success).json({
        success: true,
         message: `Caters marked as ${
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
          message: "Unexpected error during caters status updating",
        });
      }
    }
  }

  async deleteRequest(req: Request, res: Response): Promise<void> {
    try {
      const catersId = req.params.assetId;

      if (!catersId) {
        res.status(statusCodes.badRequest).json({
          success: false,
          message: "caters ID is required",
        });
        return;
      }

      const success = await this.hostCatersUseCase.removeCaters(catersId);

      if (!success) {
        res.status(statusCodes.serverError).json({
          success: false,
          message: "Error while deleting the caters",
        });
        return;
      }

      res.status(statusCodes.Success).json({
        success: true,
        message: "caters deleted successfully",
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
          message: "Unexpected error during caters deleting",
        });
      }
    }
  }
}
