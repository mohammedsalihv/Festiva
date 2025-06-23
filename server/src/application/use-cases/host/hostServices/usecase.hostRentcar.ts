import { IHostRentCarRepository } from "../../../../domain/entities/repositoryInterface/host/interface.hostRentCarRepository";
import ErrorHandler from "../../../../utils/common/errors/CustomError";
import { IRentCar } from "../../../../domain/entities/serviceInterface/interface.rentCar";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";
import { IHostRentCarUseCase } from "../../../../domain/usecaseInterface/host/interface.rentCarUseCase";

export class HostRentCarUseCase implements IHostRentCarUseCase {
  constructor(private HostRentCarRepository: IHostRentCarRepository) {}

  async addRentCar(rentCar: IRentCar): Promise<IRentCar> {
    const addRentCar = await this.HostRentCarRepository.addRentCar(rentCar);

    if (!addRentCar) {
      throw new ErrorHandler("Rent car not added", statusCodes.serverError);
    }
    return rentCar;
  }
}
