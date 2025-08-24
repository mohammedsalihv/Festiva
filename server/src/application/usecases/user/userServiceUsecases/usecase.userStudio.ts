import { Types } from "mongoose";
import { IUserStudioRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userStudioRepository";
import {
  IStudio,
  IStudioBase,
} from "../../../../domain/entities/serviceInterface/host/interface.studio";
import { IUserStudioUseCase } from "../../../../domain/usecaseInterface/user/userServiceUseCaseInterfaces/interface.userStudioUseCase";
import CustomError from "../../../../utils/common/errors/CustomError";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class UserStudioUseCase implements IUserStudioUseCase {
  constructor(private _userStudioRepository: IUserStudioRepository) {}

  async allStudios(): Promise<IStudioBase[]> {
    return await this._userStudioRepository.findAllStudios();
  }

  async studioDetails(studioId: string): Promise<IStudio> {
    const studio = await this._userStudioRepository.fetchStudioDetailsById(
      studioId
    );

    if (!studio) {
      throw new CustomError("Studio not found", statusCodes.notfound);
    }

    return studio;
  }
  async filterStudios(
    filters: Record<string, any>,
    page: number,
    limit: number
  ) {
    return await this._userStudioRepository.findByFilters(filters, page, limit);
  }

  async sortStudios(sorts: any, page: number, limit: number) {
    return await this._userStudioRepository.sortStudios(sorts, page, limit);
  }
  async findStudioHost(catersId: string): Promise<Types.ObjectId> {
    const studio = await this._userStudioRepository.fetchStudioDetailsById(
      catersId
    );
    if (!studio) {
      throw new CustomError("Studio not found", statusCodes.notfound);
    }
    if (!studio.host) {
      throw new CustomError("Host not found", statusCodes.notfound);
    }
    return studio.host as Types.ObjectId;
  }
}
