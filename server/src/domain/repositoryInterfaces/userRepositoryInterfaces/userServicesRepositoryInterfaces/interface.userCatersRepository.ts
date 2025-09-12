import {
  ICatersBase,
  ICaters,
} from "../../../baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.caters";

export interface IUserCatersRepository {
  findAllCaters(): Promise<ICatersBase[]>;
  fetchCatersById(catersId: string): Promise<ICaters | null>;
  filterCaters(
    filters: Record<string, any>,
    page: number,
    limit: number
  ): Promise<{ data: ICatersBase[]; totalPages: number; currentPage: number }>;
  sortCaters(
    sorts: Record<string, any>,
    page: number,
    limit: number
  ): Promise<{ data: ICatersBase[]; totalPages: number; currentPage: number }>;
}
