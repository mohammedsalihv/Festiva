import {
  IRentCarBase,
  IRentCar,
} from "../../../serviceInterface/interface.rentCar";

export interface IUserRentCarRepository {
  findAllRentCars(): Promise<IRentCarBase[]>;
  fetchRentCarDetailsById(rentcarId: string): Promise<IRentCar | null>;
  findByFilters(filters: Record<string, any>): Promise<IRentCarBase[]>;
  sortRentCars(sorts: any): Promise<IRentCarBase[]>;
}
