import { IVenue } from "../../../../domain/entities/serviceInterface/interface.venue";
import { IHostVenueRepository } from "../../../../domain/entities/repositoryInterface/host/interface.hostVenueRepository";
import { VenueModel } from "../../../../domain/models/venueModel";

export class HostVenueRepository implements IHostVenueRepository {
  async addVenue(venue: IVenue): Promise<IVenue> {
    try {
      const newVenue = new VenueModel(venue);
      await newVenue.save();
      return newVenue;
    } catch (error) {
      throw new Error(`Error saving venue: ${error}`);
    }
  }
}
