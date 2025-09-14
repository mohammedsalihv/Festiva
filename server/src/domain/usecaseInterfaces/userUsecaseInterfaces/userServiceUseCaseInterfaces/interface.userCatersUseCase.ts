import { Types } from "mongoose";
import { ICaters , ICatersBase } from "../../../baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.caters";

export interface IUserCatersUseCase {
  allCaters(): Promise<ICatersBase[]>;
  catersDetails(rentcarId: string): Promise<ICaters>;
  filterCaters(
    filters: any,
    page: number,
    limit: number
  ): Promise<{ data: ICatersBase[]; totalPages: number; currentPage: number }>;
  sortCaters(
    sorts: any,
    page: number,
    limit: number
  ): Promise<{ data: ICatersBase[]; totalPages: number; currentPage: number }>;
  findCatersHost(catersId: string): Promise<Types.ObjectId>;
}
