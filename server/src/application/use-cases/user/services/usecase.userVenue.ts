import { IUserVenueRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userVenueRepository";
import {
  IVenue,
  IVenueBase,
} from "../../../../domain/entities/serviceInterface/interface.venue";
import { IUserVenueUseCase } from "../../../../domain/usecaseInterface/user/services/interface.userVenueUseCase";
import CustomError from "../../../../utils/common/errors/CustomError";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class UserVenueUseCase implements IUserVenueUseCase {
  constructor(private userVenueRepository: IUserVenueRepository) {}

  async allVenues(): Promise<IVenueBase[]> {
    return await this.userVenueRepository.findAllVenues();
  }

  async venueDetails(venueId: string): Promise<IVenue> {
    const venue = await this.userVenueRepository.fetchVenueDetailsById(venueId);
    if (!venue) {
      throw new CustomError("Venue not found", statusCodes.notfound);
    }
    return venue;
  }
  async filterVenues(filters: any): Promise<IVenueBase[]> {
    return await this.userVenueRepository.findVenuesWithFilters(filters);
  }
   async sortVenues(sorts: any): Promise<IVenueBase[]> {
    return await this.userVenueRepository.sortVenues(sorts);
  }
}
