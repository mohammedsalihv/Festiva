import { IUserCatersRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userCatersRepository";
import {
  ICaters,
  ICatersBase,
} from "../../../../domain/entities/serviceInterface/interface.caters";
import { CatersModel } from "../../../../domain/models/catersModel";
import { mapCatersToBase } from "../../../../domain/entities/serviceInterface/interface.caters";

export class UserCatersRepository implements IUserCatersRepository {
  async findAllCaters(): Promise<ICatersBase[]> {
    const caters = await CatersModel.find({ status: "approved" })
      .populate("location", "city state country")
      .lean();

    return caters.map(mapCatersToBase);
  }
  async fetchCatersById(catersId: string): Promise<ICaters | null> {
    return CatersModel.findById(catersId)
      .populate({ path: "host", select: "-password" })
      .populate("location")
      .lean<ICaters>()
      .exec();
  }
  async filterCaters(filters: Record<string, any>): Promise<ICatersBase[]> {
    const query: Record<string, any> = { status: "approved" };

    if (filters.city) query["location.city"] = filters.city;
    if (filters.state) query["location.state"] = filters.state;
    if (filters.country) query["location.country"] = filters.country;
    if (filters.serviceType)
      query["serviceTypes"] = { $in: [filters.serviceType] };

    const caters = await CatersModel.find(query)
      .populate("location", "city state country")
      .lean();

    return caters.map(mapCatersToBase);
  }
}
