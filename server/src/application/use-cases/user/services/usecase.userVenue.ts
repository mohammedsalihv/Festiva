import { IUserVenueRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userVenueRepository";
import { IVenueBase } from "../../../../domain/entities/serviceInterface/interface.venue";
import { IUserVenueUseCase } from "../../../../domain/usecaseInterface/user/services/interface.userVenueUseCase";

export class UserVenueUseCase implements IUserVenueUseCase {
  constructor(private userVenueRepository: IUserVenueRepository) {}

  async allVenues(): Promise<IVenueBase[]> {
    return await this.userVenueRepository.findAllVenues();
  }
}
