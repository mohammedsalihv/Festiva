import {
  IRentCarBase,
  IRentCar,
} from "../../../baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.rentCar";

export interface IUserRentCarRepository {
  findAllRentCars(): Promise<IRentCarBase[]>;
  fetchRentCarDetailsById(rentcarId: string): Promise<IRentCar | null>;
  findByFilters(
    filters: Record<string, any>,
    page: number,
    limit: number
  ): Promise<{ data: IRentCarBase[]; totalPages: number; currentPage: number }>;
  sortRentCars(
    sorts: Record<string, any>,
    page: number,
    limit: number
  ): Promise<{ data: IRentCarBase[]; totalPages: number; currentPage: number }>;
}
