import { IVenue } from "../../../serviceInterface/interface.venue";

export interface IHostVenueRepository {
  addVenue(venue: IVenue): Promise<IVenue>;
  findVenueById(venueId: string): Promise<IVenue | null>;
  reApply(venueId: string): Promise<boolean>;
  updateAvailability(venueId: string, isAvailable: boolean): Promise<boolean>;
  deleteVenue(venueId: string): Promise<boolean>;
}
