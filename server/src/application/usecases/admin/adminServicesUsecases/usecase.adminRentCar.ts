import { IAdminRentCarUseCase } from "../../../../domain/usecaseInterface/admin/servicesUsecaseInterfaces/interface.adminRentCar";
import { IRentCar } from "../../../../domain/entities/serviceInterface/host/interface.rentCar";
import { IAdminRentCarRepository } from "../../../../domain/entities/repositoryInterface/admin/services/interface.adminRentCarRepository";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";
import { statusCodes } from "../../../../utils/baseUtilities/messages/constantResponses";

export class AdminRentCarUseCase implements IAdminRentCarUseCase {
  constructor(private _adminRentCarRepository: IAdminRentCarRepository) {}

  async rentCarDetails(rentcarId: string): Promise<IRentCar> {
    if (!rentcarId) {
      throw new CustomError(
        "Rent car ID is required",
        statusCodes.unAuthorized
      );
    }

    const car = await this._adminRentCarRepository.carDetails(rentcarId);

    if (!car) {
      throw new CustomError("Car not found", statusCodes.notfound);
    }

    return car;
  }
}
