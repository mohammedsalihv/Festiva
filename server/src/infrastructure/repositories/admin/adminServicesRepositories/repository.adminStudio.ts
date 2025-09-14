import { IStudio } from "../../../../domain/baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.studio";
import { IAdminStudioRepository } from "../../../../domain/repositoryInterfaces/adminRepositoryInterfaces/adminServicesRepositoryInterfaces/interface.adminStudioRepository";
import { StudioModel } from "../../../../domain/entities/databaseModels/hostModels/hostServicesModels/studioModel";

export class AdminStudioRepository implements IAdminStudioRepository {
  studioDetails(studioId: string): Promise<IStudio | null> {
    return StudioModel.findById(studioId)
      .populate({ path: "host", select: "-password" })
      .populate("location")
      .lean<IStudio>()
      .exec();
  }
  async getAllStudios(): Promise<IStudio[]> {
    return await StudioModel.find().lean();
  }
}
