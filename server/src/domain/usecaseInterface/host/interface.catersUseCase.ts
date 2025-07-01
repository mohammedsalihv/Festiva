import { ICaters } from "../../entities/serviceInterface/interface.caters";

export interface IHostCatersUseCase {
  addCaters(caters: ICaters): Promise<ICaters>;
}
