import { ICaters } from "../../../../domain/baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.caters";
import { IHostCatersRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostServicesRepositoryInterfaces/interface.hostCatersRepository";
import { CatersModel } from "../../../../domain/entities/databaseModels/hostModels/hostServicesModels/catersModel";

export class HostCatersRepository implements IHostCatersRepository {
  async addCaters(caters: ICaters): Promise<ICaters> {
    const newCaters = new CatersModel(caters);
    await newCaters.save();
    return newCaters;
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
          isAvailable: isAvailable,
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

  async getHostDashboardCaters(hostId: string): Promise<ICaters[]> {
    return await CatersModel.find({ host: hostId }).lean();
  }
}
