import { IAdminCatersUseCase } from "../../../../domain/usecaseInterface/admin/servicesUsecaseInterfaces/interface.adminCatersUseCase";
import { ICaters } from "../../../../domain/entities/serviceInterface/host/interface.caters";
import { IAdminCatersRepository } from "../../../../domain/entities/repositoryInterface/admin/services/interface.adminCatersRepository";
import CustomError from "../../../../utils/common/errors/CustomError";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

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
