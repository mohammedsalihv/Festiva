import { ICaters } from "../../../serviceInterface/interface.caters";

export interface IHostCatersRepository {
  addCaters(caters: ICaters): Promise<ICaters>;
  findCatersById(rentcarId: string): Promise<ICaters | null>;
}
