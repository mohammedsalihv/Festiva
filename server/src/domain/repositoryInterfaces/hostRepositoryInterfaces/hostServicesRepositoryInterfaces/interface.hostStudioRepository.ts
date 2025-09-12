import { Types } from "mongoose";
import { IStudio } from "../../../baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.studio";

export interface IHostStudioRepository {
  addStudio(studio: IStudio): Promise<IStudio>;
  studioDetails(studioId: string): Promise<IStudio | null>;
  reApply(studioId: string): Promise<boolean>;
  updateAvailability(studioId: string, isAvailable: boolean): Promise<boolean>;
  deleteStudio(studioId: string): Promise<boolean>;
  getHostDashboardStudio(hostId: string | Types.ObjectId): Promise<IStudio[]>;
}
