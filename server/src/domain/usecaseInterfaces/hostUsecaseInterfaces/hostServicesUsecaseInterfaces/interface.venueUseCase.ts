import { IVenue } from "../../../entities/serviceInterface/host/interface.venue";

export interface IHostVenueUseCase {
  addVenue(venue: IVenue): Promise<IVenue>;
  venueDetails(venueId: string): Promise<IVenue>;
  reApplyVenue(venueId: string): Promise<boolean>;
  updateVenueAvailability(
    venueId: string,
    isAvailable: boolean
  ): Promise<boolean>;
  removeVenue(venueId: string): Promise<boolean>;
}
