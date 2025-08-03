import { IVenue } from "../../../serviceInterface/host/interface.venue";

export interface IAdminVenueRepository {
  venueDetails(venueId: string): Promise<IVenue | null>;
}
