import { Request, Response } from "express";
import { addVenueDTO } from "../../../../config/DTO/host/dto.venue";
import { addVenueUseCase } from "../../../../application/use-cases/host/service/venueUseCase";
import { ILocationRepository } from "../../../../domain/entities/repositoryInterface/host/interface.locationRepostory";
import ErrorHandler from "../../../../utils/CustomError";

export class venueController {
  constructor(
    private addVenueUseCase: addVenueUseCase,
    private locationRepository: ILocationRepository // <-- inject this too
  ) {}

  async addVenue(req: Request, res: Response): Promise<void> {
    try {
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
        venueImages,
        locationDetails,
      } = req.body;

      const newLocation = await this.locationRepository.addLocation(
        locationDetails
      );

      if (!newLocation || !newLocation._id) {
        throw new ErrorHandler("Failed to create location", 400);
      }

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
        venueImages,
        location: newLocation._id,
      };

      const createdVenue = await this.addVenueUseCase.execute(venue);

      res.status(201).json(createdVenue);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    }
  }
}
