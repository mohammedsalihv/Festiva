import { IHostVenueRepository } from "../../../../domain/entities/repositoryInterface/host/interface.hostVenueRepository";
import ErrorHandler from "../../../../utils/common/errors/CustomError";
import { IVenue } from "../../../../domain/entities/serviceInterface/interface.venue";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class HostaddVenueUseCase {
  constructor(private HostVenueRepository: IHostVenueRepository) {}

  async execute(venueDetails: IVenue): Promise<IVenue> {
    const addVenue = await this.HostVenueRepository.addVenue(venueDetails);

    if (!addVenue) {
      throw new ErrorHandler("Venue not added", statusCodes.serverError);
    }

    return venueDetails;
  }
}
