import { IAdminVenueUseCase } from "../../../../domain/usecaseInterface/admin/servicesUsecaseInterfaces/interface.adminVenueUseCase";
import { IVenue } from "../../../../domain/entities/serviceInterface/host/interface.venue";
import { IAdminVenueRepository } from "../../../../domain/entities/repositoryInterface/admin/services/interface.adminVenueRepository";
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
