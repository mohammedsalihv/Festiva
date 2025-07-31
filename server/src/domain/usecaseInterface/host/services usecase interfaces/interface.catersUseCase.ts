import { ICaters } from "../../../entities/serviceInterface/interface.caters";

export interface IHostCatersUseCase {
  addCaters(caters: ICaters): Promise<ICaters>;
  catersDetails(catersId: string): Promise<ICaters>;
  reApplyCaters(catersId: string): Promise<boolean>;
  updateCatersAvailability(
    catersId: string,
    isAvailable: boolean
  ): Promise<boolean>;
  removeCaters(catersId: string): Promise<boolean>;
}
