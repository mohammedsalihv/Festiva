import { IStudio } from "../../../entities/serviceInterface/interface.studio";
export interface IHostStudioUseCase {
  addStudio(studio: IStudio): Promise<IStudio>;
  studioDetails(studioId: string): Promise<IStudio>;
  reApplyStudio(studioId: string): Promise<boolean>;
  unavailableStudio(studioId: string): Promise<boolean>;
  removeStudio(studioId: string): Promise<boolean>;
}
