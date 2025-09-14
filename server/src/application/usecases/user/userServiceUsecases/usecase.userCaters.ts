import { Types } from "mongoose";
import { IUserCatersRepository } from "../../../../domain/repositoryInterfaces/userRepositoryInterfaces/userServicesRepositoryInterfaces/interface.userCatersRepository";
import { ICaters , ICatersBase } from "../../../../domain/baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.caters";
import { IUserCatersUseCase } from "../../../../domain/usecaseInterfaces/userUsecaseInterfaces/userServiceUseCaseInterfaces/interface.userCatersUseCase";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";
import { statusCodes } from "../../../../utils/baseUtilities/messages/constantResponses";

export class UserCatersUseCase implements IUserCatersUseCase {
  constructor(private _userCatersRepository: IUserCatersRepository) {}
  async allCaters(): Promise<ICatersBase[]> {
    return await this._userCatersRepository.findAllCaters();
  }
  async catersDetails(catersId: string): Promise<ICaters> {
    const caters = await this._userCatersRepository.fetchCatersById(catersId);
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
    return await this._userCatersRepository.filterCaters(filters, page, limit);
  }

  async sortCaters(
    sorts: any,
    page: number,
    limit: number
  ): Promise<{ data: ICatersBase[]; totalPages: number; currentPage: number }> {
    return await this._userCatersRepository.sortCaters(sorts, page, limit);
  }

  async findCatersHost(catersId: string): Promise<Types.ObjectId> {
    const caters = await this._userCatersRepository.fetchCatersById(catersId);
    if (!caters) {
      throw new CustomError("Caters not found", statusCodes.notfound);
    }
    return caters.host as Types.ObjectId;
  }
}
