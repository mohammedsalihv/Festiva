import { IHostVenueRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostVenueRepository";
import ErrorHandler from "../../../../utils/common/errors/CustomError";
import { IVenue } from "../../../../domain/entities/serviceInterface/interface.venue";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";
import { IHostVenueUseCase } from "../../../../domain/usecaseInterface/host/services usecase interfaces/interface.venueUseCase";
import CustomError from "../../../../utils/common/errors/CustomError";

export class HostVenueUseCase implements IHostVenueUseCase {
  constructor(private hostVenueRepository: IHostVenueRepository) {}

  async addVenue(venue: IVenue): Promise<IVenue> {
    const addedVenue = await this.hostVenueRepository.addVenue(venue);
    if (!addedVenue) {
      throw new ErrorHandler("Venue not added", statusCodes.serverError);
    }
    return venue;
  }

  async venueDetails(venueId: string): Promise<IVenue> {
    if (!venueId) {
      throw new CustomError("Venue ID is required", statusCodes.unAuthorized);
    }
    const venue = await this.hostVenueRepository.findVenueById(venueId);
    if (!venue) {
      throw new CustomError("Venue not found", statusCodes.notfound);
    }
    return venue;
  }

  async reApplyVenue(venueId: string): Promise<boolean> {
    if (!venueId) {
      throw new CustomError("Venue ID is required", statusCodes.unAuthorized);
    }
    const updated = await this.hostVenueRepository.reApply(venueId);
    if (!updated) {
      throw new CustomError("Venue re-apply failed", statusCodes.serverError);
    }
    return true;
  }
}
