import { IVenueRepository } from "../../../../domain/entities/repositoryInterface/host/interface.venueRepository";
import ErrorHandler from "../../../../utils/CustomError";
import { addVenueDTO } from "../../../../config/DTO/host/dto.venue";
import { Types } from "mongoose";
import { IVenue } from "../../../../domain/entities/serviceInterface/interface.venue";

export class addVenueUseCase {
  constructor(private venueRepository: IVenueRepository) {}

  async execute(venueDetails: addVenueDTO): Promise<{
    venue: {
      venueName: string;
      rent?: number;
      capacity: number;
      shift: string;
      squareFeet: number;
      timeSlots: string[];
      availableDates: string[];
      details: string;
      features: string[];
      parkingFeatures: string[];
      venueDescription: string;
      terms: string;
      Images: string[];
      location: Types.ObjectId;
      host: Types.ObjectId;
    };
  }> {
    const newVenue: IVenue = {
      venueName: venueDetails.venueName,
      rent: venueDetails.rent,
      capacity: venueDetails.capacity,
      shift: venueDetails.shift,
      squareFeet: venueDetails.squareFeet,
      timeSlots: venueDetails.timeSlots,
      availableDates: venueDetails.availableDates,
      details: venueDetails.details,
      features: venueDetails.features || [],
      parkingFeatures: venueDetails.parkingFeatures || [],
      venueDescription: venueDetails.venueDescription,
      terms: venueDetails.terms,
      venueImages: venueDetails.Images,
      location: venueDetails.location,
      host: venueDetails.host,
    };

    const addVenue = await this.venueRepository.addVenue(newVenue);

    if (!addVenue) {
      throw new ErrorHandler("Venue not added", 400);
    }

    return {
      venue: {
        venueName: addVenue.venueName || "",
        rent: addVenue.rent,
        capacity: addVenue.capacity || 0,
        shift: addVenue.shift || "",
        squareFeet: addVenue.squareFeet || 0,
        timeSlots: addVenue.timeSlots || [],
        availableDates: addVenue.availableDates || [],
        details: addVenue.details || "",
        features: addVenue.features,
        parkingFeatures: addVenue.parkingFeatures,
        venueDescription: addVenue.venueDescription,
        terms: addVenue.terms,
        Images: addVenue.venueImages,
        location: addVenue.location,
        host: addVenue.host,
      },
    };
  }
}
