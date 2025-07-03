import { IUserStudioRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userStudioRepository";
import {
  IStudio,
  IStudioBase,
} from "../../../../domain/entities/serviceInterface/interface.studio";
import { StudioModel } from "../../../../domain/models/studioModel";
import { mapStudioToBase } from "../../../../domain/entities/serviceInterface/interface.studio";

export class UserStudioRepository implements IUserStudioRepository {
  async findAllStudios(): Promise<IStudioBase[]> {
    const studios = await StudioModel.find({ status: "approved" })
      .populate("location", "city state country")
      .lean();

    return studios.map(mapStudioToBase);
  }
  async fetchStudioDetailsById(studioId: string): Promise<IStudio | null> {
    return StudioModel.findById(studioId)
      .populate({ path: "host", select: "-password" })
      .populate("location")
      .lean<IStudio>()
      .exec();
  }
}
