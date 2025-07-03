import { ICatersBase , ICaters} from "../../../entities/serviceInterface/interface.caters";

export interface IUserCatersUseCase {
  allCaters(): Promise<ICatersBase[]>;
  catersDetails(rentcarId: string): Promise<ICaters>;
}
