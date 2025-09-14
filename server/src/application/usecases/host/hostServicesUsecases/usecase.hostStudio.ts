import { IHostStudioRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostServicesRepositoryInterfaces/interface.hostStudioRepository";
import ErrorHandler from "../../../../utils/baseUtilities/errors/CustomError";
import { IStudio } from "../../../../domain/baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.studio";
import { statusCodes } from "../../../../utils/baseUtilities/messages/constantResponses";
import { IHostStudioUseCase } from "../../../../domain/usecaseInterfaces/hostUsecaseInterfaces/hostServicesUsecaseInterfaces/interface.studioUseCase";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";

export class HostStudioUseCase implements IHostStudioUseCase {
  constructor(private _hostStudioRepository: IHostStudioRepository) {}

  async addStudio(studio: IStudio): Promise<IStudio> {
    const addedStudio = await this._hostStudioRepository.addStudio(studio);
    if (!addedStudio) {
      throw new ErrorHandler("Studio not added", statusCodes.serverError);
    }
    return studio;
  }

  async studioDetails(studioId: string): Promise<IStudio> {
    if (!studioId) {
      throw new CustomError("Studio ID is required", statusCodes.unAuthorized);
    }
    const studio = await this._hostStudioRepository.studioDetails(studioId);
    if (!studio) {
      throw new CustomError("Studio not found", statusCodes.notfound);
    }
    return studio;
  }

  async reApplyStudio(studioId: string): Promise<boolean> {
    if (!studioId) {
      throw new CustomError("Studio ID is required", statusCodes.unAuthorized);
    }
    const updated = await this._hostStudioRepository.reApply(studioId);
    if (!updated) {
      throw new CustomError("Studio re-apply failed", statusCodes.serverError);
    }
    return true;
  }

  async updateStudioAvailability(
    studioId: string,
    isAvailable: boolean
  ): Promise<boolean> {
    if (!studioId) {
      throw new CustomError("Studio ID is required", statusCodes.unAuthorized);
    }
    const updated = await this._hostStudioRepository.updateAvailability(
      studioId,
      isAvailable
    );
    if (!updated) {
      throw new CustomError(
        `Studio ${isAvailable ? "available" : "unavailable"} request failed`,
        statusCodes.serverError
      );
    }
    return true;
  }

  async removeStudio(studioId: string): Promise<boolean> {
    if (!studioId) {
      throw new CustomError("Studio ID is required", statusCodes.unAuthorized);
    }
    const updated = await this._hostStudioRepository.deleteStudio(studioId);
    if (!updated) {
      throw new CustomError("Studio deleting failed", statusCodes.serverError);
    }
    return true;
  }
}
