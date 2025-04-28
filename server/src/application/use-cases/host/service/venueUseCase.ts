import { IVenueRepository } from "../../../../domain/entities/repositoryInterface/host/venueRepository";
import ErrorHandler from "../../../../utils/errorHandler";
import { addVenueDTO } from "../../../../config/DTO/venueDto";
import { Types } from "mongoose";
import { IVenue } from "../../../../domain/entities/modelInterface/venue.interface"; // Fixed typo

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
      venueImages: string[];
      location: Types.ObjectId;
    };
  }> {
    if (!venueDetails.venueName)
      throw new ErrorHandler("Venue name is required", 400);
    if (!venueDetails.capacity)
      throw new ErrorHandler("Capacity is required", 400);
    if (!venueDetails.shift) throw new ErrorHandler("Shift is required", 400);
    if (!venueDetails.squareFeet)
      throw new ErrorHandler("Square feet is required", 400);
    if (!venueDetails.timeSlots || venueDetails.timeSlots.length === 0)
      throw new ErrorHandler("At least one time slot is required", 400);
    if (
      !venueDetails.availableDates ||
      venueDetails.availableDates.length === 0
    )
      throw new ErrorHandler("At least one available date is required", 400);
    if (!venueDetails.details)
      throw new ErrorHandler("Venue details are required", 400);
    if (!venueDetails.venueDescription)
      throw new ErrorHandler("Venue description is required", 400);
    if (!venueDetails.terms)
      throw new ErrorHandler("Venue terms are required", 400);
    if (!venueDetails.location)
      throw new ErrorHandler("Location is required", 400);

    const venueName = venueDetails.venueName.trim();
    if (!venueName) throw new ErrorHandler("Venue name cannot be empty", 400);

    const newVenue: IVenue = {
      venueName,
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
      venueImages: venueDetails.venueImages || [],
      location: venueDetails.location,
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
        venueImages: addVenue.venueImages,
        location: addVenue.location,
      },
    };
  }
}
