import { IUserStudioRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userStudioRepository";
import {
  IStudio,
  IStudioBase,
} from "../../../../domain/entities/serviceInterface/interface.studio";
import { IUserStudioUseCase } from "../../../../domain/usecaseInterface/user/services/interface.userStudioUseCase";
import CustomError from "../../../../utils/common/errors/CustomError";
import {
  statusCodes
} from "../../../../utils/common/messages/constantResponses";

export class UserStudioUseCase implements IUserStudioUseCase {
  constructor(private userStudioRepository: IUserStudioRepository) {}
  async allStudios(): Promise<IStudioBase[]> {
    return await this.userStudioRepository.findAllStudios();
  }

  async studioDetails(studioId: string): Promise<IStudio> {
    const studio = await this.userStudioRepository.fetchStudioDetailsById(
      studioId
    );

    if (!studio) {
      throw new CustomError("Studio not found", statusCodes.notfound);
    }

    return studio;
  }
}
