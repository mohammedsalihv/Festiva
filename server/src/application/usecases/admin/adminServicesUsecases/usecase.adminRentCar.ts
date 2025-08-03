import { IAdminRentCarUseCase } from "../../../../domain/usecaseInterface/admin/servicesUsecaseInterfaces/interface.adminRentCar";
import { IRentCar } from "../../../../domain/entities/serviceInterface/host/interface.rentCar";
import { IAdminRentCarRepository } from "../../../../domain/entities/repositoryInterface/admin/services/interface.adminRentCarRepository";
import CustomError from "../../../../utils/common/errors/CustomError";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class AdminRentCarUseCase implements IAdminRentCarUseCase {
  constructor(private adminRentCarRepository: IAdminRentCarRepository) {}

  async rentCarDetails(rentcarId: string): Promise<IRentCar> {
    if (!rentcarId) {
      throw new CustomError(
        "Rent car ID is required",
        statusCodes.unAuthorized
      );
    }

    const car = await this.adminRentCarRepository.carDetails(rentcarId);

    if (!car) {
      throw new CustomError("Car not found", statusCodes.notfound);
    }

    return car;
  }
}
