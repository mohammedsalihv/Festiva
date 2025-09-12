import { IVenue } from "../../../baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.venue";

export interface IAdminVenueRepository {
  venueDetails(venueId: string): Promise<IVenue | null>;
  getAllVenues(): Promise<IVenue[]>;
}
