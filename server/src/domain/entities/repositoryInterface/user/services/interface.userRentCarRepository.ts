import { IRentCarBase } from "../../../serviceInterface/interface.rentCar";

export interface IUserRentCarRepository {
  findAllRentCars(): Promise<IRentCarBase[]>;
}
