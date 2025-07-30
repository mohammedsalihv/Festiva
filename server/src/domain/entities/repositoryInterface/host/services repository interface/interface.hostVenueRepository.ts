import { IVenue } from "../../../serviceInterface/interface.venue";

export interface IHostVenueRepository {
  addVenue(venue: IVenue): Promise<IVenue>;
  findVenueById(venueId: string): Promise<IVenue | null>;
  reApply(venueId: string): Promise<boolean>;
  unavailableRequest(venueId: string): Promise<boolean>;
  deleteVenue(venueId: string): Promise<boolean>;
}
