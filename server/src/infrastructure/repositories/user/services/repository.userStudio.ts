import { IUserStudioRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userStudioRepository";
import { IStudioBase } from "../../../../domain/entities/serviceInterface/interface.studio";
import { StudioModel } from "../../../../domain/models/studioModel";
import { mapStudioToBase } from "../../../../domain/entities/serviceInterface/interface.studio";

export class UserStudioRepository implements IUserStudioRepository {
  async findAllStudios(): Promise<IStudioBase[]> {
    const studios = await StudioModel.find({ status: "approved" })
      .populate("location", "city state country")
      .lean();

    return studios.map(mapStudioToBase);
  }
}
