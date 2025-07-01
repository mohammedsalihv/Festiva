import { ICaters } from "../../../serviceInterface/interface.caters";

export interface IAdminCatersRepository {
  catersDetails(rentcarId: string): Promise<ICaters | null>;
}
