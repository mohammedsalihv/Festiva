import { IRentCar } from "../../../serviceInterface/host/interface.rentCar";

export interface IAdminRentCarRepository {
  carDetails(rentcarId: string): Promise<IRentCar | null>;
}
