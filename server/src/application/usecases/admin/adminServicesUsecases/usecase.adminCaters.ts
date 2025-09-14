import { IAdminCatersUseCase } from "../../../../domain/usecaseInterfaces/adminUsecaseInterfaces/adminServicesUsecaseInterfaces/interface.adminCatersUseCase";
import { ICaters } from "../../../../domain/baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.caters";
import { IAdminCatersRepository } from "../../../../domain/repositoryInterfaces/adminRepositoryInterfaces/adminServicesRepositoryInterfaces/interface.adminCatersRepository";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";
import { statusCodes } from "../../../../utils/baseUtilities/messages/constantResponses";

export class AdminCatersUseCase implements IAdminCatersUseCase {
  constructor(private _adminCatersRepository: IAdminCatersRepository) {}

  async catersDetails(catersId: string): Promise<ICaters> {
    if (!catersId) {
      throw new CustomError("Caters ID is required", statusCodes.unAuthorized);
    }
    const caters = await this._adminCatersRepository.catersDetails(catersId);

    if (!caters) {
      throw new CustomError("Caters not found", statusCodes.notfound);
    }
    return caters;
  }
}
