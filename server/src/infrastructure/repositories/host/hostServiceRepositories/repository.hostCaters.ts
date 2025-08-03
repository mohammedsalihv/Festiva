import { ICaters } from "../../../../domain/entities/serviceInterface/host/interface.caters";
import { IHostCatersRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostCatersRepository";
import { CatersModel } from "../../../../domain/models/host/hostServiceModels/catersModel";

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

  async updateAvailability(
    catersId: string,
    isAvailable: boolean
  ): Promise<boolean> {
    const result = await CatersModel.updateOne(
      { _id: catersId },
      {
        $set: {
          isAvailable,
          status: isAvailable ? "available" : "unavailable",
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
