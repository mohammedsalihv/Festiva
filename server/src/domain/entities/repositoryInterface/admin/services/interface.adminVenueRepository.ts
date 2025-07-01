import { IVenue } from "../../../serviceInterface/interface.venue";

export interface IAdminVenueRepository {
  venueDetails(venueId: string): Promise<IVenue | null>;
}
