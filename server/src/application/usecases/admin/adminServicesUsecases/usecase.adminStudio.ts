import { IAdminStudioUseCase } from "../../../../domain/usecaseInterface/admin/servicesUsecaseInterfaces/interface.adminStudioUseCase";
import { IStudio } from "../../../../domain/entities/serviceInterface/host/interface.studio";
import { IAdminStudioRepository } from "../../../../domain/entities/repositoryInterface/admin/services/interface.adminStudioRepository";
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
