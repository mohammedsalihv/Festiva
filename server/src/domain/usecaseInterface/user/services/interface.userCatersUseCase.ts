import {
  ICatersBase,
  ICaters,
} from "../../../entities/serviceInterface/interface.caters";

export interface IUserCatersUseCase {
  allCaters(): Promise<ICatersBase[]>;
  catersDetails(rentcarId: string): Promise<ICaters>;
  filterCaters(filters: Record<string, any>): Promise<ICatersBase[]>;
  sortCaters(sorts: any): Promise<ICatersBase[]>;
}
