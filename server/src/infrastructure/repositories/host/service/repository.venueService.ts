import { IVenue } from "../../../../domain/entities/serviceInterface/interface.venue";
import { IVenueRepository } from "../../../../domain/entities/repositoryInterface/host/interface.venueRepository";
import { VenueModel } from "../../../../domain/models/venueModel";

export class venueRepository implements IVenueRepository{
    async addVenue(venue: IVenue): Promise<IVenue> {
        const newVenue = new VenueModel(venue)
        await newVenue.save();
        return newVenue;
    }
}