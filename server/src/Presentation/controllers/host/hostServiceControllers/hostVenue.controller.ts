import { Request, Response } from "express";
import { IVenue } from "../../../../domain/entities/serviceInterface/interface.venue";
import { HostVenueUseCase } from "../../../../application/use-cases/host/hostServices/usecase.hostVenue";
import { IHostAssetLocationRepository } from "../../../../domain/entities/repositoryInterface/host/interface.hostAssetLocationRepostory";
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

export interface MulterRequest extends Request {
  files?: { [fieldname: string]: Express.Multer.File[] };
  file?: Express.Multer.File;
  auth?: JwtPayload & { id: string; role?: string };
}

export class HostVenueController {
  constructor(
    private hostVenueUseCase: HostVenueUseCase,
    private hostAssetlocationRepository: IHostAssetLocationRepository
  ) {}

  async addVenue(req: MulterRequest, res: Response): Promise<void> {
    try {
      const hostId = req.auth?.id;

      if (!hostId) {
        res
          .status(statusCodes.unAuthorized)
          .json({ message: statusMessages.unAuthorized });
        return;
      }

      const newVenu = req.body;
      const files = req.files?.["Images"] || [];
      const typeOfAsset = "venue";

      try {
        await assetFilesValidate({ files, typeOfAsset });
      } catch (validationErr: any) {
        console.error("❌ File validation failed:", validationErr);
        res
          .status(statusCodes.badRequest)
          .json({ message: validationErr.message || "Invalid files" });
        return;
      }

      const newLocation = await this.hostAssetlocationRepository.addLocation(
        newVenu.location
      );

      if (!newLocation || !newLocation._id) {
        res
          .status(statusCodes.serverError)
          .json({ message: "Failed to create location" });
        return;
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
      } = newVenu;

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
        location: newLocation._id,
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
        return;
      }

      res.status(statusCodes.serverError).json({
        message: "Failed to add new venue",
        error: error.message || error,
      });
    }
  }
}
