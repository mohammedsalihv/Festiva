import { ICaters } from "../../../../domain/baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.caters";
import { IAdminCatersRepository } from "../../../../domain/repositoryInterfaces/adminRepositoryInterfaces/adminServicesRepositoryInterfaces/interface.adminCatersRepository";
import { CatersModel } from "../../../../domain/entities/databaseModels/hostModels/hostServicesModels/catersModel";

export class AdminCatersRepository implements IAdminCatersRepository {
  catersDetails(catersId: string): Promise<ICaters | null> {
    return CatersModel.findById(catersId)
      .populate({ path: "host", select: "-password" })
      .populate("location")
      .lean<ICaters>()
      .exec();
  }
  async getAllCaters(): Promise<ICaters[]> {
    return await CatersModel.find().lean();
  }
}
