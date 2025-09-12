import {
  IStudioBase,
  IStudio,
} from "../../../baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.studio";

export interface IUserStudioRepository {
  findAllStudios(): Promise<IStudioBase[]>;
  fetchStudioDetailsById(studioId: string): Promise<IStudio | null>;
  findByFilters(
    filters: Record<string, any>,
    page: number,
    limit: number
  ): Promise<{ data: IStudioBase[]; totalPages: number; currentPage: number }>;
  sortStudios(
    sorts: any,
    page: number,
    limit: number
  ): Promise<{ data: IStudioBase[]; totalPages: number; currentPage: number }>;
}
