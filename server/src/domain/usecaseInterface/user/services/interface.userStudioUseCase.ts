import { IStudioBase } from "../../../entities/serviceInterface/interface.studio";
export interface IUserStudioUseCase {
  allStudios(): Promise<IStudioBase[]>;
}
