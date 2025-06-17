import { Request, Response } from "express";
import { addVenueDTO } from "../../../../config/DTO/host/dto.venue";
import { HostaddVenueUseCase } from "../../../../application/use-cases/host/hostServices/usecase.venue";
import { IHostAssetLocationRepository } from "../../../../domain/entities/repositoryInterface/host/interface.hostAssetLocationRepostory";
import ErrorHandler from "../../../../utils/common/errors/CustomError";
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import logger from "../../../../utils/common/messages/logger";
import { sanitizeVenueInput } from "../../../../utils/common/general/sanitizeInput";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";

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
    console.log('req body', req.body)
    const hostId = req.auth?.id;
    if (!hostId) {
      throw new ErrorHandler(
        statusMessages.unAuthorized,
        statusCodes.unAuthorized
      );
    }

    try {
      const cleanedData = req.body
      const files = req.files as Express.Multer.File[];
      const imageUrls = files.map(
        (file) => `uploads/Images/assets/venues/${file.filename}`
      );
      const newLocation = await this.hostAssetlocationRepository.addLocation(
        cleanedData.location
      );

      if (!newLocation || !newLocation._id) {
        throw new ErrorHandler(
          "Failed to create location",
          statusCodes.serverError
        );
      }

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
      } = cleanedData;

      const venue: addVenueDTO = {
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
