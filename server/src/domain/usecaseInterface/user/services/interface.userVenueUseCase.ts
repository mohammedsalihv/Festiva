import {
  IVenue,
  IVenueBase,
} from "../../../entities/serviceInterface/interface.venue";
export interface IUserVenueUseCase {
  allVenues(): Promise<IVenueBase[]>;
  venueDetails(venueId: string): Promise<IVenue>;
  filterVenues(filters: any): Promise<IVenueBase[]>;
  sortVenues(sorts: any): Promise<any>;
}
