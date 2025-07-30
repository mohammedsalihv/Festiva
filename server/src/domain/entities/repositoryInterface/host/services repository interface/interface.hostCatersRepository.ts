import { ICaters } from "../../../serviceInterface/interface.caters";

export interface IHostCatersRepository {
  addCaters(catersId: ICaters): Promise<ICaters>;
  findCatersById(catersId: string): Promise<ICaters | null>;
  reApply(catersId: string): Promise<boolean>;
  unavailableRequest(catersId: string): Promise<boolean>;
  deleteCaters(catersId: string): Promise<boolean>;
}
