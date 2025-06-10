import { IAdminVenueUseCase } from "../../../domain/usecaseInterface/interface.venueUseCase";
import { IVenue } from "../../../domain/entities/serviceInterface/interface.venue";
import { IAdminVenueRepository } from "../../../domain/entities/repositoryInterface/admin/interface.adminVenueRepository";
import CustomError from "../../../utils/CustomError";

export class AdminVenueUseCase implements IAdminVenueUseCase {
  constructor(private adminVenuerepository: IAdminVenueRepository) {}

  async execute(venueId: string): Promise<IVenue> {
    if (!venueId) {
      throw new CustomError("Venue ID is required", 401);
    }

    const venue = await this.adminVenuerepository.venueDetails(venueId);

    if (!venue) {
      throw new CustomError("Venue not found", 404);
    }

    return venue;
  }
}
