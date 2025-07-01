import { IUserCatersRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userCatersRepository";
import { ICatersBase } from "../../../../domain/entities/serviceInterface/interface.caters";
import { CatersModel } from "../../../../domain/models/catersModel";
import { mapCatersToBase } from "../../../../domain/entities/serviceInterface/interface.caters";

export class UserCatersRepository implements IUserCatersRepository {
  async findAllCaters(): Promise<ICatersBase[]> {
    const caters = await CatersModel.find({ status: "approved" })
      .populate("location", "city state country")
      .lean();

    return caters.map(mapCatersToBase);
  }
}
