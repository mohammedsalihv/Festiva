import { IRentCar } from "../../entities/serviceInterface/interface.rentCar";

export interface IHostRentCarUseCase {
  addRentCar(rentCar: IRentCar): Promise<IRentCar>;
}

