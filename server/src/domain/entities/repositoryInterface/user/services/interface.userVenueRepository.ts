import { IVenueBase, IVenue } from "../../../serviceInterface/host/interface.venue";

export interface IUserVenueRepository {
  findAllVenues(): Promise<IVenueBase[]>;
  fetchVenueDetailsById(venueId: string): Promise<IVenue | null>;
  findVenuesWithFilters(
    filters: any,
    page: number,
    limit: number
  ): Promise<{
    data: IVenueBase[];
    totalPages: number;
    currentPage: number;
  }>;

  sortVenues(
    sorts: any,
    page: number,
    limit: number
  ): Promise<{
    data: IVenueBase[];
    totalPages: number;
    currentPage: number;
  }>;
}
