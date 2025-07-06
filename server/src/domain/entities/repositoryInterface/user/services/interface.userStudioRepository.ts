import {
  IStudioBase,
  IStudio,
} from "../../../serviceInterface/interface.studio";

export interface IUserStudioRepository {
  findAllStudios(): Promise<IStudioBase[]>;
  fetchStudioDetailsById(studioId: string): Promise<IStudio | null>;
  findByFilters(filters: Record<string, any>): Promise<IStudioBase[]>;
  sortStudios(sorts: any): Promise<IStudioBase[]>;
}
