import { IUserRentCarRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userRentCarRepository";
import {
  IRentCar,
  IRentCarBase,
} from "../../../../domain/entities/serviceInterface/interface.rentCar";
import { IUserRentCarUseCase } from "../../../../domain/usecaseInterface/user/services/interface.userRentCarUseCase";
import CustomError from "../../../../utils/common/errors/CustomError";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class UserRentCarUseCase implements IUserRentCarUseCase {
  constructor(private userRentCarRepository: IUserRentCarRepository) {}
  async allRentCars(): Promise<IRentCarBase[]> {
    return await this.userRentCarRepository.findAllRentCars();
  }
  async rentCarDetails(rentcarId: string): Promise<IRentCar> {
    const car = await this.userRentCarRepository.fetchRentCarDetailsById(
      rentcarId
    );

    if (!car) {
      throw new CustomError("Car not found", statusCodes.notfound);
    }

    return car;
  }
}
