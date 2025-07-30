import { IVenue } from "../../../entities/serviceInterface/interface.venue";

export interface IHostVenueUseCase {
  addVenue(venue: IVenue): Promise<IVenue>;
  venueDetails(venueId: string): Promise<IVenue>;
  reApplyVenue(venueId: string): Promise<boolean>;
  unavailableVenue(venueId: string): Promise<boolean>;
  removeVenue(venueId: string): Promise<boolean>;
}
