import { IUserRentCarRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userRentCarRepository";
import {
  IRentCar,
  IRentCarBase,
} from "../../../../domain/entities/serviceInterface/host/interface.rentCar";
import { IUserRentCarUseCase } from "../../../../domain/usecaseInterface/user/userServiceUseCaseInterfaces/interface.userRentCarUseCase";
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
  async filterRentCars(
    filters: Record<string, any>,
    page: number,
    limit: number
  ) {
    return await this.userRentCarRepository.findByFilters(filters, page, limit);
  }

  async sortRentCars(sorts: any, page: number, limit: number) {
    return await this.userRentCarRepository.sortRentCars(sorts, page, limit);
  }
}
