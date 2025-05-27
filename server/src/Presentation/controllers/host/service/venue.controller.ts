import { Request, Response } from "express";
import { addVenueDTO } from "../../../../config/DTO/host/dto.venue";
import { addVenueUseCase } from "../../../../application/use-cases/host/service/venueUseCase";
import { ILocationRepository } from "../../../../domain/entities/repositoryInterface/host/interface.locationRepostory";
import ErrorHandler from "../../../../utils/CustomError";
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import logger from "../../../../utils/logger";
import { sanitizeVenueInput } from "../../../../utils/sanitizeInput";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
  files?: Express.Multer.File[];
  auth?: JwtPayload & { id: string; role?: string };
}

export class venueController {
  constructor(
    private addVenueUseCase: addVenueUseCase,
    private locationRepository: ILocationRepository
  ) {}

  async addVenue(req: MulterRequest, res: Response): Promise<void> {
    const hostId = req.auth?.id;
    if (!hostId) {
      throw new ErrorHandler("Unauthorized: host ID missing", 401);
    }

    try {
      const cleanedData = sanitizeVenueInput(req.body);

      const files = req.files as Express.Multer.File[];
      const imageUrls = files.map(
        (file) => `uploads/assetImages/${file.filename}`
      );

      // Fix: use location from cleanedData
      const newLocation = await this.locationRepository.addLocation(
        cleanedData.location
      );

      if (!newLocation || !newLocation._id) {
        throw new ErrorHandler("Failed to create location", 400);
      }

      // Fix: use destructured data from cleanedData
      const {
        venueName,
        rent,
        capacity,
        shift,
        squareFeet,
        timeSlots,
        availableDates,
        details,
        features,
        parkingFeatures,
        venueDescription,
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
        details,
        features,
        parkingFeatures,
        venueDescription,
        terms,
        Images: imageUrls,
        location: newLocation._id,
        host: new Types.ObjectId(hostId),
      };

      const createdVenue = await this.addVenueUseCase.execute(venue);
      res.status(201).json(createdVenue);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        logger.error(error);
        res.status(error.statusCode).json({ message: error.message });
      } else {
        logger.error(error);
        res.status(500).json({ message: "Failed to add new venue", error });
      }
    }
  }
}
