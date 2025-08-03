import { IStudio } from "../../../entities/serviceInterface/host/interface.studio";
export interface IHostStudioUseCase {
  addStudio(studio: IStudio): Promise<IStudio>;
  studioDetails(studioId: string): Promise<IStudio>;
  reApplyStudio(studioId: string): Promise<boolean>;
  updateStudioAvailability(
    studioId: string,
    isAvailable: boolean
  ): Promise<boolean>;
  removeStudio(studioId: string): Promise<boolean>;
}
