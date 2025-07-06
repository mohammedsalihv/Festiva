import { IHostVenueRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostVenueRepository";
import ErrorHandler from "../../../../utils/common/errors/CustomError";
import { IVenue } from "../../../../domain/entities/serviceInterface/interface.venue";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";
import { IHostVenueUseCase } from "../../../../domain/usecaseInterface/host/interface.venueUseCase";

export class HostVenueUseCase implements IHostVenueUseCase {
  constructor(private hostVenueRepository: IHostVenueRepository) {}

  async addVenue(venue: IVenue): Promise<IVenue> {
    const addedVenue = await this.hostVenueRepository.addVenue(venue);

    if (!addedVenue) {
      throw new ErrorHandler("Venue not added", statusCodes.serverError);
    }

    return venue;
  }
}
