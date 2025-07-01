import { IAdminVenueUseCase } from "../../../../domain/usecaseInterface/admin/interface.adminVenueUseCase";
import { IVenue } from "../../../../domain/entities/serviceInterface/interface.venue";
import { IAdminVenueRepository } from "../../../../domain/entities/repositoryInterface/admin/services/interface.adminVenueRepository";
import CustomError from "../../../../utils/common/errors/CustomError";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class AdminVenueUseCase implements IAdminVenueUseCase {
  constructor(private adminVenuerepository: IAdminVenueRepository) {}

  async execute(venueId: string): Promise<IVenue> {
    if (!venueId) {
      throw new CustomError("Venue ID is required", statusCodes.unAuthorized);
    }

    const venue = await this.adminVenuerepository.venueDetails(venueId);

    if (!venue) {
      throw new CustomError("Venue not found", statusCodes.notfound);
    }

    return venue;
  }
}
