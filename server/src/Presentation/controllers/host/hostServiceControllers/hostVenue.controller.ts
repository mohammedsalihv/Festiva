import { Request, Response } from "express";
import { IVenue } from "../../../../domain/entities/serviceInterface/interface.venue";
import { HostaddVenueUseCase } from "../../../../application/use-cases/host/hostServices/usecase.venue";
import { IHostAssetLocationRepository } from "../../../../domain/entities/repositoryInterface/host/interface.hostAssetLocationRepostory";
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

interface MulterRequest extends Request {
  file?: Express.Multer.File;
  files?: Express.Multer.File[];
  auth?: JwtPayload & { id: string; role?: string };
}

export class HostVenueController {
  constructor(
    private hostAddVenueUseCase: HostaddVenueUseCase,
    private hostAssetlocationRepository: IHostAssetLocationRepository
  ) {}

  async addVenue(req: MulterRequest, res: Response): Promise<void> {
    const hostId = req.auth?.id;
    if (!hostId) {
      throw new ErrorHandler(
        statusMessages.unAuthorized,
        statusCodes.unAuthorized
      );
    }

    try {
      const newVenu = req.body;
      const files = req.files as Express.Multer.File[];

      try {
        await assetFilesValidate({ files, typeOfAsset: newVenu.typeOfAsset });

        const newLocation = await this.hostAssetlocationRepository.addLocation(
          newVenu.location
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
                assetType: newVenu.typeOfAsset,
                buffer: file.buffer,
                filename: `${newVenu.typeOfAsset}_${timestamp}_${i}`,
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

        const createdVenue = await this.hostAddVenueUseCase.execute(venue);
        res.status(statusCodes.Success).json(createdVenue);
        return;
      } catch (error: any) {
        res
          .status(error.statusCode || 500)
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
          .json({ message: "Failed to add new venue", error });
      }
    }
  }
}
