import { IStudioBase } from "../../../serviceInterface/interface.studio";

export interface IUserStudioRepository {
  findAllStudios(): Promise<IStudioBase[]>;
}
