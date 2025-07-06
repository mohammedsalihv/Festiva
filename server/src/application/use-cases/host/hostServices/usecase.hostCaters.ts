import { IHostCatersRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostCatersRepository";
import { IHostCatersUseCase } from "../../../../domain/usecaseInterface/host/interface.catersUseCase";
import ErrorHandler from "../../../../utils/common/errors/CustomError";
import { ICaters } from "../../../../domain/entities/serviceInterface/interface.caters";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class HostCatersUseCase implements IHostCatersUseCase {
  constructor(private hostCatersRepository: IHostCatersRepository) {}

  async addCaters(caters: ICaters): Promise<ICaters> {
    const addedCaters = await this.hostCatersRepository.addCaters(caters);

    if (!addedCaters) {
      throw new ErrorHandler("caters team not added", statusCodes.serverError);
    }
    return addedCaters;
  }
}
