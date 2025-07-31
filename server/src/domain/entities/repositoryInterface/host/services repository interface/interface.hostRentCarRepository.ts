import { IRentCar } from "../../../serviceInterface/interface.rentCar";

export interface IHostRentCarRepository {
  addRentCar(rentCar: IRentCar): Promise<IRentCar>;
  findCarById(rentcarId: string): Promise<IRentCar | null>;
  reApply(rentcarId: string): Promise<boolean>;
  updateAvailability(rentcarId: string, isAvailable: boolean): Promise<boolean>;
  deleteRentcar(rentcarId: string): Promise<boolean>;
}
