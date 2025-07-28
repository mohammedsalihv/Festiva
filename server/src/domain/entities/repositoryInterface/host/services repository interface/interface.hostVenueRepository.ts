import { IVenue } from "../../../serviceInterface/interface.venue";

export interface IHostVenueRepository {
  addVenue(venue: IVenue): Promise<IVenue>;
  findVenueById(venueId: string): Promise<IVenue | null>;
}
