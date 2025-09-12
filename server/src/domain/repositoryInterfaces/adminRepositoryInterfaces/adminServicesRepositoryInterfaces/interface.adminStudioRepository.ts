import { IStudio } from "../../../baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.studio";

export interface IAdminStudioRepository {
  studioDetails(studioId: string): Promise<IStudio | null>;
  getAllStudios(): Promise<IStudio[]>;
}
