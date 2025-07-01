import { IStudio } from "../../serviceInterface/interface.studio";

export interface IHostStudioRepository {
  addStudio(studio: IStudio): Promise<IStudio>;
}
