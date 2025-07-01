import { ICatersBase } from "../../../entities/serviceInterface/interface.caters";

export interface IUserCatersUseCase {
  allCaters(): Promise<ICatersBase[]>;
}
