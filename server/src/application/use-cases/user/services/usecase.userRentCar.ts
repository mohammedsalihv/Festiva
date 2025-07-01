import { IUserRentCarRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userRentCarRepository";
import { IRentCarBase } from "../../../../domain/entities/serviceInterface/interface.rentCar";
import { IUserRentCarUseCase } from "../../../../domain/usecaseInterface/user/services/interface.userRentCarUseCase";

export class UserRentCarUseCase implements IUserRentCarUseCase {
  constructor(private userRentCarRepository: IUserRentCarRepository) {}
  async allRentCars(): Promise<IRentCarBase[]> {
    return await this.userRentCarRepository.findAllRentCars();
  }
}
