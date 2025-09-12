import { IHostVenueRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostVenueRepository";
import ErrorHandler from "../../../../utils/baseUtilities/errors/CustomError";
import { IVenue } from "../../../../domain/entities/serviceInterface/host/interface.venue";
import { statusCodes } from "../../../../utils/baseUtilities/messages/constantResponses";
import { IHostVenueUseCase } from "../../../../domain/usecaseInterface/host/services usecase interfaces/interface.venueUseCase";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";

export class HostVenueUseCase implements IHostVenueUseCase {
  constructor(private _hostVenueRepository: IHostVenueRepository) {}

  async addVenue(venue: IVenue): Promise<IVenue> {
    const addedVenue = await this._hostVenueRepository.addVenue(venue);
    if (!addedVenue) {
      throw new ErrorHandler("Venue not added", statusCodes.serverError);
    }
    return venue;
  }

  async venueDetails(venueId: string): Promise<IVenue> {
    if (!venueId) {
      throw new CustomError("Venue ID is required", statusCodes.unAuthorized);
    }
    const venue = await this._hostVenueRepository.findVenueById(venueId);
    if (!venue) {
      throw new CustomError("Venue not found", statusCodes.notfound);
    }
    return venue;
  }

  async reApplyVenue(venueId: string): Promise<boolean> {
    if (!venueId) {
      throw new CustomError("Venue ID is required", statusCodes.unAuthorized);
    }
    const updated = await this._hostVenueRepository.reApply(venueId);
    if (!updated) {
      throw new CustomError("Venue re-apply failed", statusCodes.serverError);
    }
    return true;
  }

  async updateVenueAvailability(
    venueId: string,
    isAvailable: boolean
  ): Promise<boolean> {
    if (!venueId) {
      throw new CustomError("Venue ID is required", statusCodes.unAuthorized);
    }
    const updated = await this._hostVenueRepository.updateAvailability(
      venueId,
      isAvailable
    );

    if (!updated) {
      throw new CustomError(
        `Venue ${isAvailable ? "available" : "unavailable"} request failed`,
        statusCodes.serverError
      );
    }
    return true;
  }

  async removeVenue(venueId: string): Promise<boolean> {
    if (!venueId) {
      throw new CustomError("Venue ID is required", statusCodes.unAuthorized);
    }
    const updated = await this._hostVenueRepository.deleteVenue(venueId);
    if (!updated) {
      throw new CustomError("Venue deleting failed", statusCodes.serverError);
    }
    return true;
  }
}
