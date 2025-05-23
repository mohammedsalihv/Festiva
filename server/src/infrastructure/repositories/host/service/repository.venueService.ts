import { IVenue } from "../../../../domain/entities/modelInterface/venue.interface";
import { IVenueRepository } from "../../../../domain/entities/repositoryInterface/host/venueRepository";
import { VenueModel } from "../../../../domain/models/venueModel";

export class venueRepository implements IVenueRepository{
    async addVenue(venue: IVenue): Promise<IVenue> {
        const newVenue = new VenueModel(venue)
        await newVenue.save();
        return newVenue;
    }
}