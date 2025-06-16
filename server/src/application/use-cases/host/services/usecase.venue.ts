import { IVenueRepository } from "../../../../domain/entities/repositoryInterface/host/interface.hostVenueRepository";
import ErrorHandler from "../../../../utils/common/errors/CustomError";
import { IVenue } from "../../../../domain/entities/serviceInterface/interface.venue";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class addVenueUseCase {
  constructor(private venueRepository: IVenueRepository) {}

  async execute(venueDetails: IVenue): Promise<IVenue> {
    const addVenue = await this.venueRepository.addVenue(venueDetails);

    if (!addVenue) {
      throw new ErrorHandler("Venue not added", statusCodes.serverError);
    }

    return venueDetails;
  }
}
