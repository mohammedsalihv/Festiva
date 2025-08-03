import { ICaters } from "../../../serviceInterface/host/interface.caters";

export interface IAdminCatersRepository {
  catersDetails(rentcarId: string): Promise<ICaters | null>;
}
