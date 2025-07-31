import { IStudio } from "../../../../domain/entities/serviceInterface/interface.studio";
import { StudioModel } from "../../../../domain/models/studioModel";
import { IHostStudioRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostStudioRepository";

export class HostStudioRepository implements IHostStudioRepository {
  async addStudio(studio: IStudio): Promise<IStudio> {
    try {
      const newStudio = new StudioModel(studio);
      await newStudio.save();
      return newStudio;
    } catch (error) {
      throw new Error(`Error saving new Studio: ${error}`);
    }
  }

  studioDetails(studioId: string): Promise<IStudio | null> {
    return StudioModel.findById(studioId)
      .populate({ path: "host", select: "-password" })
      .populate("location")
      .lean<IStudio>()
      .exec();
  }

  async reApply(studioId: string): Promise<boolean> {
    const result = await StudioModel.updateOne(
      { _id: studioId },
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
    studioId: string,
    isAvailable: boolean
  ): Promise<boolean> {
    const result = await StudioModel.updateOne(
      { _id: studioId },
      {
        $set: {
          isAvailable,
          status: isAvailable ? "available" : "unavailable",
        },
      }
    );
    return result.modifiedCount > 0;
  }

  async deleteStudio(studioId: string): Promise<boolean> {
    const deleted = await StudioModel.findByIdAndDelete(studioId);
    if (!deleted) {
      console.warn("Venue not found:", studioId);
      return false;
    }
    return true;
  }
}
