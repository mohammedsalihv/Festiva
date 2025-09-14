import { Types } from "mongoose";
import { IUserVenueRepository } from "../../../../domain/repositoryInterfaces/userRepositoryInterfaces/userServicesRepositoryInterfaces/interface.userVenueRepository";
import {
  IVenue,
  IVenueBase,
} from "../../../../domain/baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.venue";
import { IUserVenueUseCase } from "../../../../domain/usecaseInterfaces/userUsecaseInterfaces/userServiceUseCaseInterfaces/interface.userVenueUseCase";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";
import { statusCodes } from "../../../../utils/baseUtilities/messages/constantResponses";

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
  async findVenueHost(venueId: string): Promise<Types.ObjectId> {
    const venue = await this._userVenueRepository.fetchVenueDetailsById(
      venueId
    );
    if (!venue) {
      throw new CustomError("Venue not found", statusCodes.notfound);
    }
    return venue.host as Types.ObjectId;
  }
}
