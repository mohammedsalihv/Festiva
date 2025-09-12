import { IRentCar } from "../../../baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.rentCar";

export interface IAdminRentCarRepository {
  carDetails(rentcarId: string): Promise<IRentCar | null>;
  getAllRentCars(): Promise<IRentCar[]>;
}
