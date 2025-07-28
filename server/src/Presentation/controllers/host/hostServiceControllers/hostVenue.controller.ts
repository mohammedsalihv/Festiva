import { Request, Response } from "express";
import { IVenue } from "../../../../domain/entities/serviceInterface/interface.venue";
import { IHostVenueController } from "../../../../domain/controlInterface/host/service controller interfaces/interface.hostVenueController";
import { HostVenueUseCase } from "../../../../application/use-cases/host/hostServices/usecase.hostVenue";
import { IHostAssetLocationRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.hostAssetLocationRepostory";
import ErrorHandler from "../../../../utils/common/errors/CustomError";
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import { uploadAssetImages } from "../../../../utils/common/cloudinary/uploadAssetImage";
import { assetFilesValidate } from "../../../../utils/host/assetFilesValidate";
import logger from "../../../../utils/common/messages/logger";
import CustomError from "../../../../utils/common/errors/CustomError";

export interface MulterRequest extends Request {
  files?: { [fieldname: string]: Express.Multer.File[] };
  file?: Express.Multer.File;
  auth?: JwtPayload & { id: string; role?: string };
}

export class HostVenueController implements IHostVenueController {
  constructor(
    private hostVenueUseCase: HostVenueUseCase,
    private hostAssetlocationRepository: IHostAssetLocationRepository
  ) {}

  async addVenueService(req: MulterRequest, res: Response): Promise<void> {
    const hostId = req.auth?.id;

    if (!hostId) {
      res
        .status(statusCodes.unAuthorized)
        .json({ message: statusMessages.unAuthorized });
      return;
    }

    try {
      const newVenue = req.body;
      const files = req.files?.["Images"] || [];
      const typeOfAsset = "venue";

      await assetFilesValidate({ files, typeOfAsset });

      const newLocation = await this.hostAssetlocationRepository.addLocation(
        newVenue.location
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
        venueName,
        rent,
        capacity,
        shift,
        squareFeet,
        timeSlots,
        availableDates,
        about,
        features,
        parkingFeatures,
        description,
        terms,
      } = newVenue;

      const venue: IVenue = {
        venueName,
        rent,
        capacity,
        shift,
        squareFeet,
        timeSlots,
        availableDates,
        about,
        features,
        parkingFeatures,
        description,
        terms,
        Images: imageUrls,
        location: new Types.ObjectId(newLocation._id),
        host: new Types.ObjectId(hostId),
      };

      const createdVenue = await this.hostVenueUseCase.addVenue(venue);
      res.status(statusCodes.Success).json(createdVenue);
    } catch (error: any) {
      logger.error(error);
      if (error instanceof ErrorHandler) {
        res
          .status(error.statusCode)
          .json({ message: error.message || "Something went wrong" });
      } else {
        res.status(statusCodes.serverError).json({
          message: "Failed to add new venue",
          error: error.message || error,
        });
      }
    }
  }

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
      const venue = await this.hostVenueUseCase.venueDetails(venueId);
      res.status(statusCodes.Success).json({
        success: true,
        message: "Venue details fetched successfully",
        data: venue,
      });
    } catch (error:any) {
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
