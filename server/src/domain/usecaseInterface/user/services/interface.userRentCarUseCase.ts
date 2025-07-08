import {
  IRentCarBase,
  IRentCar,
} from "../../../entities/serviceInterface/interface.rentCar";

export interface IUserRentCarUseCase {
  allRentCars(): Promise<IRentCarBase[]>;
  rentCarDetails(rentcarId: string): Promise<IRentCar>;
  filterRentCars(
    filters: any,
    page: number,
    limit: number
  ): Promise<{ data: IRentCarBase[]; totalPages: number; currentPage: number }>;
  sortRentCars(
    sorts: any,
    page: number,
    limit: number
  ): Promise<{ data: IRentCarBase[]; totalPages: number; currentPage: number }>;
}
