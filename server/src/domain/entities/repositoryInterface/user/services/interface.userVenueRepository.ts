import { IVenueBase } from "../../../serviceInterface/interface.venue";

export interface IUserVenueRepository {
  findAllVenues(): Promise<IVenueBase[]>;
}
