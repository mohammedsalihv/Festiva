import { IRentCar } from "../../entities/serviceInterface/interface.rentCar";

export interface IAdminRentCarUseCase {
  rentCarDetails(rentcarId: string): Promise<IRentCar>;
}
