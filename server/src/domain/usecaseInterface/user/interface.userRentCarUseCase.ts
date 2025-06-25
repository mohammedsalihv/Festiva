import { IRentCarBase } from "../../entities/serviceInterface/interface.rentCar";

export interface IUserRentCarUseCase {
  allRentCars(): Promise<IRentCarBase[]>;
}
