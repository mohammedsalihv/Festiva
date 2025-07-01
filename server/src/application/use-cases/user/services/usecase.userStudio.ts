import { IUserStudioRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userStudioRepository";
import { IStudioBase } from "../../../../domain/entities/serviceInterface/interface.studio";
import { IUserStudioUseCase } from "../../../../domain/usecaseInterface/user/services/interface.userStudioUseCase";

export class UserStudioUseCase implements IUserStudioUseCase {
  constructor(private userStudioRepository: IUserStudioRepository) {}
  async allStudios(): Promise<IStudioBase[]> {
    return await this.userStudioRepository.findAllStudios();
  }
}
