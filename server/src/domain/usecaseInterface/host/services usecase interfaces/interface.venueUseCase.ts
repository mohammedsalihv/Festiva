import { IVenue } from "../../entities/serviceInterface/interface.venue";

export interface IHostVenueUseCase {
  addVenue(venue: IVenue): Promise<IVenue>;
}

