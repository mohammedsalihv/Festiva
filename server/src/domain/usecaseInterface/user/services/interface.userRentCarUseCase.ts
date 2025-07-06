import {
  IRentCarBase,
  IRentCar,
} from "../../../entities/serviceInterface/interface.rentCar";

export interface IUserRentCarUseCase {
  allRentCars(): Promise<IRentCarBase[]>;
  rentCarDetails(rentcarId: string): Promise<IRentCar>;
  filterRentCars(filters: Record<string, any>): Promise<IRentCarBase[]>;
  sortRentCars(sorts: any): Promise<IRentCarBase[]>;
}
