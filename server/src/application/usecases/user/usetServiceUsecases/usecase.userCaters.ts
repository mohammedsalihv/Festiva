import { IUserCatersRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userCatersRepository";
import {
  ICaters,
  ICatersBase,
} from "../../../../domain/entities/serviceInterface/host/interface.caters";
import { IUserCatersUseCase } from "../../../../domain/usecaseInterface/user/userServiceUseCaseInterfaces/interface.userCatersUseCase";
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
  async filterCaters(
    filters: Record<string, any>,
    page: number,
    limit: number
  ): Promise<{ data: ICatersBase[]; totalPages: number; currentPage: number }> {
    return await this.userCatersRepository.filterCaters(filters, page, limit);
  }

  async sortCaters(
    sorts: any,
    page: number,
    limit: number
  ): Promise<{ data: ICatersBase[]; totalPages: number; currentPage: number }> {
    return await this.userCatersRepository.sortCaters(sorts, page, limit);
  }
}
