import { ICaters } from "../../../../domain/entities/serviceInterface/interface.caters";
import { IAdminCatersRepository } from "../../../../domain/entities/repositoryInterface/admin/services/interface.adminCatersRepository";
import { CatersModel } from "../../../../domain/models/catersModel";

export class AdminCatersRepository implements IAdminCatersRepository {
  catersDetails(catersId: string): Promise<ICaters | null> {
    return CatersModel.findById(catersId)
      .populate({ path: "host", select: "-password" })
      .populate("location")
      .lean<ICaters>()
      .exec();
  }
}
