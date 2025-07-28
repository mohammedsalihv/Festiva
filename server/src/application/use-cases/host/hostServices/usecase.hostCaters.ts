import { IHostCatersRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostCatersRepository";
import { IHostCatersUseCase } from "../../../../domain/usecaseInterface/host/services usecase interfaces/interface.catersUseCase";
import ErrorHandler from "../../../../utils/common/errors/CustomError";
import { ICaters } from "../../../../domain/entities/serviceInterface/interface.caters";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";
import CustomError from "../../../../utils/common/errors/CustomError";

export class HostCatersUseCase implements IHostCatersUseCase {
  constructor(private hostCatersRepository: IHostCatersRepository) {}

  async addCaters(caters: ICaters): Promise<ICaters> {
    const addedCaters = await this.hostCatersRepository.addCaters(caters);

    if (!addedCaters) {
      throw new ErrorHandler("caters team not added", statusCodes.serverError);
    }
    return addedCaters;
  }

  
  async catersDetails(catersId: string): Promise<ICaters> {
    if (!catersId) {
      throw new CustomError("Caters ID is required", statusCodes.unAuthorized);
    }

    const caters = await this.hostCatersRepository.findCatersById(catersId);

    if (!caters) {
      throw new CustomError("Caters not found", statusCodes.notfound);
    }

    return caters;
  }
}
