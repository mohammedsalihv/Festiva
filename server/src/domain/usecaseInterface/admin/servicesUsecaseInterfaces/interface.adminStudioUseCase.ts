import { IStudio } from "../../entities/serviceInterface/interface.studio";

export interface IAdminStudioUseCase {
  studioDetails(studioId: string): Promise<IStudio>;
}
