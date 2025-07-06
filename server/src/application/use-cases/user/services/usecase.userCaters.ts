import { IUserCatersRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userCatersRepository";
import {
  ICaters,
  ICatersBase,
} from "../../../../domain/entities/serviceInterface/interface.caters";
import { IUserCatersUseCase } from "../../../../domain/usecaseInterface/user/services/interface.userCatersUseCase";
import CustomError from "../../../../utils/common/errors/CustomError";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";
export class UserCatersUseCase implements IUserCatersUseCase {
  constructor(private userCatersRepository: IUserCatersRepository) {}
  async allCaters(): Promise<ICatersBase[]> {
    return await this.userCatersRepository.findAllCaters();
  }
  async catersDetails(catersId: string): Promise<ICaters> {
    const caters = await this.userCatersRepository.fetchCatersById(catersId);

    if (!caters) {
      throw new CustomError("Caters not found", statusCodes.notfound);
    }

    return caters;
  }
  async filterCaters(filters: Record<string, any>): Promise<ICatersBase[]> {
    return this.userCatersRepository.filterCaters(filters);
  }
  async sortCaters(sorts: any): Promise<ICatersBase[]> {
    return await this.userCatersRepository.sortCaters(sorts);
  }
}
