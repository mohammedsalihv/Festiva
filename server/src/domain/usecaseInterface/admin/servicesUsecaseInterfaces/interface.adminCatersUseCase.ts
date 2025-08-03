import { ICaters } from "../../entities/serviceInterface/interface.caters";

export interface IAdminCatersUseCase {
  catersDetails(catersId: string): Promise<ICaters>;
}
