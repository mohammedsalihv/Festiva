import { ICaters } from "../../../baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.caters";

export interface IAdminCatersRepository {
  catersDetails(rentcarId: string): Promise<ICaters | null>;
  getAllCaters(): Promise<ICaters[]>;
}
