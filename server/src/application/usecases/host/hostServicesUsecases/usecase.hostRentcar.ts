import { IHostRentCarRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostRentCarRepository";
import ErrorHandler from "../../../../utils/common/errors/CustomError";
import { IRentCar } from "../../../../domain/entities/serviceInterface/host/interface.rentCar";
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
  
  async reApplyRentcar(rentcarId: string): Promise<boolean> {
    if (!rentcarId) {
      throw new CustomError(
        "Rent car ID is required",
        statusCodes.unAuthorized
      );
    }
    const updated = await this.hostRentCarRepository.reApply(rentcarId);
    if (!updated) {
      throw new CustomError(
        "Rent car re-apply failed",
        statusCodes.serverError
      );
    }
    return true;
  }

  async updateRentcarAvailability(rentcarId: string, isAvailable: boolean): Promise<boolean> {
  if (!rentcarId) {
    throw new CustomError("Rentcar ID is required", statusCodes.unAuthorized);
  }

  const updated = await this.hostRentCarRepository.updateAvailability(rentcarId, isAvailable);

  if (!updated) {
    throw new CustomError(
      `Rentcar ${isAvailable ? "available" : "unavailable"} request failed`,
      statusCodes.serverError
    );
  }

  return true;
}

  async removeRentcar(rentcarId: string): Promise<boolean> {
      if (!rentcarId) {
      throw new CustomError(
        "Rent car ID is required",
        statusCodes.unAuthorized
      );
    }
    const updated = await this.hostRentCarRepository.deleteRentcar(rentcarId);
    if (!updated) {
      throw new CustomError(
        "Rent car deleting failed",
        statusCodes.serverError
      );
    }
    return true;
  }
}
