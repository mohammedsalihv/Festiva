import { IRentCar } from "../../../baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.rentCar";

export interface IAdminRentCarUseCase {
  rentCarDetails(rentcarId: string): Promise<IRentCar>;
}
