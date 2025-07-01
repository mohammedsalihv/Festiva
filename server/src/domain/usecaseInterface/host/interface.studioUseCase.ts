import { IStudio } from "../../entities/serviceInterface/interface.studio";

export interface IHostStudioUseCase {
  addStudio(studio: IStudio): Promise<IStudio>;
}

