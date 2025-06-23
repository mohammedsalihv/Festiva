import { IHostVenueRepository } from "../../../../domain/entities/repositoryInterface/host/interface.hostVenueRepository";
import ErrorHandler from "../../../../utils/common/errors/CustomError";
import { IVenue } from "../../../../domain/entities/serviceInterface/interface.venue";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";
import { IHostVenueUseCase } from "../../../../domain/usecaseInterface/host/interface.venueUseCase";

export class HostVenueUseCase implements IHostVenueUseCase {
  constructor(private HostVenueRepository: IHostVenueRepository) {}

  async addVenue(venue: IVenue): Promise<IVenue> {
    const addVenue = await this.HostVenueRepository.addVenue(venue);

    if (!addVenue) {
      throw new ErrorHandler("Venue not added", statusCodes.serverError);
    }

    return venue;
  }
}
