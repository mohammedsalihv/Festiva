import { IVenue } from "../../entities/serviceInterface/interface.venue";

export interface IAdminVenueUseCase {
  execute(venueId: string): Promise<IVenue>;
}
