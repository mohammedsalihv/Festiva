import { IVenue } from "../../../baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.venue";
export interface IAdminVenueUseCase {
  execute(venueId: string): Promise<IVenue>;
}
