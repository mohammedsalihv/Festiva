import { Types } from "mongoose";
import { ICaters } from "../../../serviceInterface/host/interface.caters";

export interface IHostCatersRepository {
  addCaters(catersId: ICaters): Promise<ICaters>;
  findCatersById(catersId: string): Promise<ICaters | null>;
  reApply(catersId: string): Promise<boolean>;
  updateAvailability(catersId: string, isAvailable: boolean): Promise<boolean>;
  deleteCaters(catersId: string): Promise<boolean>;
  getHostDashboardCaters(hostId: string | Types.ObjectId): Promise<ICaters[]>;
}
