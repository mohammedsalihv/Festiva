import { ICaters } from "../../../baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.caters";
export interface IAdminCatersUseCase {
  catersDetails(catersId: string): Promise<ICaters>;
}
