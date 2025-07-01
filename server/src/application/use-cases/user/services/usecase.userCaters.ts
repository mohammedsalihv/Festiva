import { IUserCatersRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userCatersRepository";
import { ICatersBase } from "../../../../domain/entities/serviceInterface/interface.caters";
import { IUserCatersUseCase } from "../../../../domain/usecaseInterface/user/services/interface.userCatersUseCase";

export class UserCatersUseCase implements IUserCatersUseCase {
  constructor(private userCatersRepository: IUserCatersRepository) {}
  async allCaters(): Promise<ICatersBase[]> {
    return await this.userCatersRepository.findAllCaters();
  }
}
