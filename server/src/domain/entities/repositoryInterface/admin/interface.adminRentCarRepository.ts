import { IRentCar } from "../../serviceInterface/interface.rentCar";

export interface IAdminRentCarRepository {
  carDetails(rentcarId: string): Promise<IRentCar | null>;
}
