import { Types } from "mongoose";
import { IRentCar , IRentCarBase } from "../../../baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.rentCar";

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
  findRentCarHost(rentcarId: string): Promise<Types.ObjectId>;
}
