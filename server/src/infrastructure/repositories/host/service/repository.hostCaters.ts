import { ICaters } from "../../../../domain/entities/serviceInterface/interface.caters";
import { IHostCatersRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostCatersRepository";
import { CatersModel } from "../../../../domain/models/catersModel";

export class HostCatersRepository implements IHostCatersRepository {
  async addCaters(caters: ICaters): Promise<ICaters> {
    try {
      const newCaters = new CatersModel(caters);
      await newCaters.save();
      return newCaters;
    } catch (error) {
      throw new Error(`Error saving new Caters: ${error}`);
    }
  }

  findCatersById(catersId: string): Promise<ICaters | null> {
    return CatersModel.findById(catersId)
      .populate({ path: "host", select: "-password" })
      .populate("location")
      .lean<ICaters>()
      .exec();
  }
}
