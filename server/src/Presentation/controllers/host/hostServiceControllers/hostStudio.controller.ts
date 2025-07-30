import { Request, Response } from "express";
import { IStudio } from "../../../../domain/entities/serviceInterface/interface.studio";
import { HostStudioUseCase } from "../../../../application/use-cases/host/hostServices/usecase.hostStudio";
import { IHostStudioController } from "../../../../domain/controlInterface/host/service controller interfaces/interface.hostStudioController";
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
import { geocodeAddress } from "../../../../utils/common/geocoding/geocodeAddress";
import CustomError from "../../../../utils/common/errors/CustomError";

export interface MulterRequest extends Request {
  files?: { [fieldname: string]: Express.Multer.File[] };
  file?: Express.Multer.File;
  auth?: JwtPayload & { id: string; role?: string };
}

export class HostStudioController implements IHostStudioController {
  constructor(
    private hostStudioUseCase: HostStudioUseCase,
    private hostAssetlocationRepository: IHostAssetLocationRepository
  ) {}

  async addStudioService(req: MulterRequest, res: Response): Promise<void> {
    const hostId = req.auth?.id;
    if (!hostId) {
      throw new ErrorHandler(
        statusMessages.unAuthorized,
        statusCodes.unAuthorized
      );
    }

    try {
      const newStudio = req.body;
      let parsedPackages: any[] = [];
      if (Array.isArray(newStudio.packages)) {
        parsedPackages = newStudio.packages.map((pkg: string) =>
          JSON.parse(pkg)
        );
      } else if (newStudio.packages === "string") {
        parsedPackages = [JSON.parse(newStudio.packages)];
      }

      const files = req.files?.["Images"] || [];
      const typeOfAsset = "studio";

      try {
        await assetFilesValidate({ files, typeOfAsset });

        const fullAddress = `${newStudio.location.houseNo}, ${newStudio.location.street}, ${newStudio.location.district}, ${newStudio.location.state}, ${newStudio.location.country}, ${newStudio.location.zip}`;

        const { lat, lng } = await geocodeAddress(fullAddress);

        newStudio.location.coordinates = {
          type: "Point",
          coordinates: [lng, lat],
        };

        const newLocation = await this.hostAssetlocationRepository.addLocation(
          newStudio.location
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
          studioName,
          timeSlots,
          availableDates,
          serviceFeatures,
          terms,
          description,
          about,
        } = newStudio;

        const studio: IStudio = {
          studioName,
          packages: parsedPackages,
          timeSlots,
          availableDates,
          serviceFeatures,
          terms,
          description,
          about,
          Images: imageUrls,
          location: new Types.ObjectId(newLocation._id),
          host: new Types.ObjectId(hostId),
        };

        const createdStudio = await this.hostStudioUseCase.addStudio(studio);
        res.status(statusCodes.Success).json(createdStudio);
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
          .json({ message: "Failed to add new studio", error });
      }
    }
  }

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
      const studio = await this.hostStudioUseCase.studioDetails(studioId);
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
  async requestReApproval(req: Request, res: Response): Promise<void> {
    try {
      const studioId = req.params.assetId;

      if (!studioId) {
        res.status(statusCodes.badRequest).json({
          success: false,
          message: "Studio ID is required",
        });
        return;
      }

      const success = await this.hostStudioUseCase.reApplyStudio(studioId);

      if (!success) {
        res.status(statusCodes.serverError).json({
          success: false,
          message: "Studio re-apply failed",
        });
        return;
      }

      res.status(statusCodes.Success).json({
        success: true,
        message: "Studio re-apply request submitted successfully",
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

  async Unavailable(req: Request, res: Response): Promise<void> {
    try {
      const studioId = req.params.assetId;

      if (!studioId) {
        res.status(statusCodes.badRequest).json({
          success: false,
          message: "studio ID is required",
        });
        return;
      }

      const success = await this.hostStudioUseCase.unavailableStudio(studioId);

      if (!success) {
        res.status(statusCodes.serverError).json({
          success: false,
          message: "Failed to changing the studio status to un-avaialble",
        });
        return;
      }

      res.status(statusCodes.Success).json({
        success: true,
        message: "studio status changed successfully",
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
          message: "Unexpected error during studio status updating",
        });
      }
    }
  }

  async deleteRequest(req: Request, res: Response): Promise<void> {
    try {
      const studioId = req.params.assetId;

      if (!studioId) {
        res.status(statusCodes.badRequest).json({
          success: false,
          message: "studio ID is required",
        });
        return;
      }

      const success = await this.hostStudioUseCase.removeStudio(studioId);

      if (!success) {
        res.status(statusCodes.serverError).json({
          success: false,
          message: "Error while deleting the studio",
        });
        return;
      }

      res.status(statusCodes.Success).json({
        success: true,
        message: "studio deleted successfully",
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
          message: "Unexpected error during studio deleting",
        });
      }
    }
  }
}
