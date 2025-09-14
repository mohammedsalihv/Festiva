import { IAdminStudioUseCase } from "../../../../domain/usecaseInterfaces/adminUsecaseInterfaces/adminServicesUsecaseInterfaces/interface.adminStudioUseCase";
import { IStudio } from "../../../../domain/baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.studio";
import { IAdminStudioRepository } from "../../../../domain/repositoryInterfaces/adminRepositoryInterfaces/adminServicesRepositoryInterfaces/interface.adminStudioRepository";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";
import { statusCodes } from "../../../../utils/baseUtilities/messages/constantResponses";

export class AdminStudioUseCase implements IAdminStudioUseCase {
  constructor(private _adminStudioRepository: IAdminStudioRepository) {}

  async studioDetails(studioId: string): Promise<IStudio> {
    if (!studioId) {
      throw new CustomError("Studio ID is required", statusCodes.unAuthorized);
    }
    const studio = await this._adminStudioRepository.studioDetails(studioId);
    if (!studio) {
      throw new CustomError("Studio not found", statusCodes.notfound);
    }
    return studio;
  }
}
