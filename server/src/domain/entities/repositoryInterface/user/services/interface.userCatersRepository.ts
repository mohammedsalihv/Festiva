import { ICatersBase } from "../../../serviceInterface/interface.caters";

export interface IUserCatersRepository {
  findAllCaters(): Promise<ICatersBase[]>;
}
