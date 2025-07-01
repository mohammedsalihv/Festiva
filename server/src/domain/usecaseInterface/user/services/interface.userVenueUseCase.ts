import { IVenueBase } from "../../../entities/serviceInterface/interface.venue";
export interface IUserVenueUseCase {
  allVenues(): Promise<IVenueBase[]>;
}
