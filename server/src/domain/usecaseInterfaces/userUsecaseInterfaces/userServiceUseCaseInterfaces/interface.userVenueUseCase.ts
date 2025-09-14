import { Types } from "mongoose";
import { IVenue , IVenueBase } from "../../../baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.venue";
export interface IUserVenueUseCase {
  allVenues(): Promise<IVenueBase[]>;
  venueDetails(venueId: string): Promise<IVenue>;
  filterVenues(
    filters: any,
    page: number,
    limit: number
  ): Promise<{ data: IVenueBase[]; totalPages: number; currentPage: number }>;
  sortVenues(
    sorts: any,
    page: number,
    limit: number
  ): Promise<{ data: IVenueBase[]; totalPages: number; currentPage: number }>;
  findVenueHost(venueId: string): Promise<Types.ObjectId>;
}
