import { IStudio } from "../../../../domain/entities/serviceInterface/host/interface.studio";
import { IAdminStudioRepository } from "../../../../domain/entities/repositoryInterface/admin/services/interface.adminStudioRepository";
import { StudioModel } from "../../../../domain/models/host/hostServiceModels/studioModel";

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
