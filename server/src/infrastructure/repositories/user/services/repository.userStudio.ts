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
  async findByFilters(filters: Record<string, any>): Promise<IStudioBase[]> {
    const query: any = {
      status: "approved",
    };

    if (filters.city) query["location.city"] = filters.city;
    if (filters.state) query["location.state"] = filters.state;
    if (filters.country) query["location.country"] = filters.country;

    if (filters.equipment) query["packages.equipments"] = filters.equipment;
    if (filters.manPower) query["packages.manPower"] = filters.manPower;
    if (filters.payment) query["packages.payment"] = filters.payment;

    const studios = await StudioModel.find(query)
      .populate("location", "city state country")
      .lean();

    return studios.map(mapStudioToBase);
  }
}
