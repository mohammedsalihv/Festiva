import {
  ICatersBase,
  ICaters,
} from "../../../serviceInterface/interface.caters";

export interface IUserCatersRepository {
  findAllCaters(): Promise<ICatersBase[]>;
  fetchCatersById(catersId: string): Promise<ICaters | null>;
  filterCaters(filters: Record<string, any>): Promise<ICatersBase[]>;
  sortCaters(sorts: any): Promise<ICatersBase[]>;
}
