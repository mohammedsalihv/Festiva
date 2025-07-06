import { IVenueBase, IVenue } from "../../../serviceInterface/interface.venue";

export interface IUserVenueRepository {
  findAllVenues(): Promise<IVenueBase[]>;
  fetchVenueDetailsById(venueId: string): Promise<IVenue | null>;
  findVenuesWithFilters(filters: any): Promise<IVenueBase[]>;
  sortVenues(sorts: any): Promise<IVenueBase[]>;
}
