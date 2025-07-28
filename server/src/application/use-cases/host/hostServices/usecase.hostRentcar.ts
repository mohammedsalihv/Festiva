import { IHostRentCarRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.hostRentCarRepository";
import ErrorHandler from "../../../../utils/common/errors/CustomError";
import { IRentCar } from "../../../../domain/entities/serviceInterface/interface.rentCar";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";
import { IHostRentCarUseCase } from "../../../../domain/usecaseInterface/host/services usecase interfaces/interface.rentCarUseCase";
import CustomError from "../../../../utils/common/errors/CustomError";

export class HostRentCarUseCase implements IHostRentCarUseCase {
  constructor(private hostRentCarRepository: IHostRentCarRepository) {}

  async addRentCar(rentCar: IRentCar): Promise<IRentCar> {
    const addedRentCar = await this.hostRentCarRepository.addRentCar(rentCar);

    if (!addedRentCar) {
      throw new ErrorHandler("Rent car not added", statusCodes.serverError);
    }
    return rentCar;
  }

  async rentCarDetails(rentcarId: string): Promise<IRentCar> {
    if (!rentcarId) {
      throw new CustomError(
        "Rent car ID is required",
        statusCodes.unAuthorized
      );
    }
    const car = await this.hostRentCarRepository.findCarById(rentcarId);
    if (!car) {
      throw new CustomError("Car not found", statusCodes.notfound);
    }
    return car;
  }
}
