import {
  IRentCarBase,
  IRentCar,
} from "../../../serviceInterface/interface.rentCar";

export interface IUserRentCarRepository {
  findAllRentCars(): Promise<IRentCarBase[]>;
  fetchRentCarDetailsById(rentcarId: string): Promise<IRentCar | null>;
}
