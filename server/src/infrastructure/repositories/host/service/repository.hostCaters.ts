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

  async reApply(catersId: string): Promise<boolean> {
    const result = await CatersModel.updateOne(
      { _id: catersId },
      {
        $set: {
          isReapplied: true,
          rejectedReason: "",
          status: "pending",
        },
      }
    );

    return result.modifiedCount > 0;
  }

  async unavailableRequest(catersId: string): Promise<boolean> {
    const result = await CatersModel.updateOne(
      { _id: catersId },
      {
        $set: {
          isAvailable: false,
          status: "unavailable",
        },
      }
    );

    return result.modifiedCount > 0;
  }

  async deleteCaters(catersId: string): Promise<boolean> {
    const deleted = await CatersModel.findByIdAndDelete(catersId);
    if (!deleted) {
      console.warn("Venue not found:", catersId);
      return false;
    }
    return true;
  }
}
