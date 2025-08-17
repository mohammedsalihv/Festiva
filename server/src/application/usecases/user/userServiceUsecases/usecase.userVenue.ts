import { IUserVenueRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userVenueRepository";
import {
  IVenue,
  IVenueBase,
} from "../../../../domain/entities/serviceInterface/host/interface.venue";
import { IUserVenueUseCase } from "../../../../domain/usecaseInterface/user/userServiceUseCaseInterfaces/interface.userVenueUseCase";
import CustomError from "../../../../utils/common/errors/CustomError";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class UserVenueUseCase implements IUserVenueUseCase {
  constructor(private _userVenueRepository: IUserVenueRepository) {}

  async allVenues(): Promise<IVenueBase[]> {
    return await this._userVenueRepository.findAllVenues();
  }

  async venueDetails(venueId: string): Promise<IVenue> {
    const venue = await this._userVenueRepository.fetchVenueDetailsById(
      venueId
    );
    if (!venue) {
      throw new CustomError("Venue not found", statusCodes.notfound);
    }
    return venue;
  }
  async filterVenues(filters: any, page: number, limit: number) {
    return await this._userVenueRepository.findVenuesWithFilters(
      filters,
      page,
      limit
    );
  }

  async sortVenues(sorts: any, page: number, limit: number) {
    return await this._userVenueRepository.sortVenues(sorts, page, limit);
  }
}
