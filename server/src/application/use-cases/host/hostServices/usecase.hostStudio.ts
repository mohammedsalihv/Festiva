import { IHostStudioRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostStudioRepository";
import ErrorHandler from "../../../../utils/common/errors/CustomError";
import { IStudio } from "../../../../domain/entities/serviceInterface/interface.studio";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";
import { IHostStudioUseCase } from "../../../../domain/usecaseInterface/host/services usecase interfaces/interface.studioUseCase";
import CustomError from "../../../../utils/common/errors/CustomError";

export class HostStudioUseCase implements IHostStudioUseCase {
  constructor(private hostStudioRepository: IHostStudioRepository) {}

  async addStudio(studio: IStudio): Promise<IStudio> {
    const addedStudio = await this.hostStudioRepository.addStudio(studio);
    if (!addedStudio) {
      throw new ErrorHandler("Studio not added", statusCodes.serverError);
    }
    return studio;
  }

  async studioDetails(studioId: string): Promise<IStudio> {
    if (!studioId) {
      throw new CustomError("Studio ID is required", statusCodes.unAuthorized);
    }
    const studio = await this.hostStudioRepository.studioDetails(studioId);
    if (!studio) {
      throw new CustomError("Studio not found", statusCodes.notfound);
    }
    return studio;
  }

  async reApplyStudio(studioId: string): Promise<boolean> {
    if (!studioId) {
      throw new CustomError("Studio ID is required", statusCodes.unAuthorized);
    }
    const updated = await this.hostStudioRepository.reApply(studioId);
    if (!updated) {
      throw new CustomError("Studio re-apply failed", statusCodes.serverError);
    }
    return true;
  }

  async unavailableStudio(studioId: string): Promise<boolean> {if (!studioId) {
      throw new CustomError("Studio ID is required", statusCodes.unAuthorized);
    }
    const updated = await this.hostStudioRepository.unavailableRequest(studioId);
    if (!updated) {
      throw new CustomError("Studio un-available request failed", statusCodes.serverError);
    }
    return true;}

  async removeStudio(studioId: string): Promise<boolean> {if (!studioId) {
      throw new CustomError("Studio ID is required", statusCodes.unAuthorized);
    }
    const updated = await this.hostStudioRepository.deleteStudio(studioId);
    if (!updated) {
      throw new CustomError("Studio deleting failed", statusCodes.serverError);
    }
    return true;}
}
