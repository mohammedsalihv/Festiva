import { IAdminVenueUseCase } from "../../../../domain/usecaseInterfaces/adminUsecaseInterfaces/adminServicesUsecaseInterfaces/interface.adminVenueUseCase";
import { IVenue } from "../../../../domain/baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.venue";
import { IAdminVenueRepository } from "../../../../domain/repositoryInterfaces/adminRepositoryInterfaces/adminServicesRepositoryInterfaces/interface.adminVenueRepository";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";
import { statusCodes } from "../../../../utils/baseUtilities/messages/constantResponses";

export class AdminVenueUseCase implements IAdminVenueUseCase {
  constructor(private _adminVenueRepository: IAdminVenueRepository) {}

  async execute(venueId: string): Promise<IVenue> {
    if (!venueId) {
      throw new CustomError("Venue ID is required", statusCodes.unAuthorized);
    }
    const venue = await this._adminVenueRepository.venueDetails(venueId);
    if (!venue) {
      throw new CustomError("Venue not found", statusCodes.notfound);
    }
    return venue;
  }
}
