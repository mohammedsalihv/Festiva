import { IStudio } from "../../../../domain/entities/serviceInterface/interface.studio";
import { StudioModel } from "../../../../domain/models/studioModel";
import { IHostStudioRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostStudioRepository";

export class HostStudioRepository implements IHostStudioRepository {
  async addStudio(studio: IStudio): Promise<IStudio> {
    try {
      const newStudio = new StudioModel(studio);
      await newStudio.save();
      return newStudio;
    } catch (error) {
      throw new Error(`Error saving new Studio: ${error}`);
    }
  }
}
