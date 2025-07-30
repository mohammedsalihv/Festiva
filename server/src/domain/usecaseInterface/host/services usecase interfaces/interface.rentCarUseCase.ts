import { IRentCar } from "../../../entities/serviceInterface/interface.rentCar";

export interface IHostRentCarUseCase {
  addRentCar(rentCar: IRentCar): Promise<IRentCar>;
  rentCarDetails(rentcarId: string): Promise<IRentCar>;
  reApplyRentcar(rentcarId: string): Promise<boolean>;
}

