import { IStudio } from "../../../serviceInterface/interface.studio";

export interface IHostStudioRepository {
  addStudio(studio: IStudio): Promise<IStudio>;
  studioDetails(studioId: string): Promise<IStudio | null>;
}
