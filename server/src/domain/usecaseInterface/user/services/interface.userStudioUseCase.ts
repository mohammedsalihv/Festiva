import { IStudioBase , IStudio} from "../../../entities/serviceInterface/interface.studio";
export interface IUserStudioUseCase {
  allStudios(): Promise<IStudioBase[]>;
  studioDetails(studioId: string): Promise<IStudio>;
}
