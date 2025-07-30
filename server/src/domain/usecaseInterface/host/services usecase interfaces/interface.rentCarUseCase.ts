import { IRentCar } from "../../../entities/serviceInterface/interface.rentCar";

export interface IHostRentCarUseCase {
  addRentCar(rentCar: IRentCar): Promise<IRentCar>;
  rentCarDetails(rentcarId: string): Promise<IRentCar>;
  reApplyRentcar(rentcarId: string): Promise<boolean>;
  unavailableRentcar(rentcarId: string): Promise<boolean>;
  removeRentcar(rentcarId: string): Promise<boolean>;
}
