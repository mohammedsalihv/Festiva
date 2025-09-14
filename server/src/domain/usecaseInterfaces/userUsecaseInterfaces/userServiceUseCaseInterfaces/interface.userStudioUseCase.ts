import { Types } from "mongoose";
import { IStudio , IStudioBase } from "../../../baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.studio";
export interface IUserStudioUseCase {
  allStudios(): Promise<IStudioBase[]>;
  studioDetails(studioId: string): Promise<IStudio>;
  filterStudios(
    filters: any,
    page: number,
    limit: number
  ): Promise<{ data: IStudioBase[]; totalPages: number; currentPage: number }>;
  sortStudios(
    sorts: any,
    page: number,
    limit: number
  ): Promise<{ data: IStudioBase[]; totalPages: number; currentPage: number }>;
  findStudioHost(studioId: string): Promise<Types.ObjectId>;
}
