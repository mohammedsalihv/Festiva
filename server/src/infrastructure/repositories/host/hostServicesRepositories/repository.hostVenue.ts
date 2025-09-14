import { IVenue } from "../../../../domain/baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.venue";
import { IHostVenueRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostServicesRepositoryInterfaces/interface.hostVenueRepository";
import { VenueModel } from "../../../../domain/entities/databaseModels/hostModels/hostServicesModels/venueModel";
import { Types } from "mongoose";

export class HostVenueRepository implements IHostVenueRepository {
  async addVenue(venue: IVenue): Promise<IVenue> {
    const newVenue = new VenueModel(venue);
    await newVenue.save();
    return newVenue;
  }

  async findVenueById(venueId: string): Promise<IVenue | null> {
    return VenueModel.findById(venueId)
      .populate({ path: "host", select: "-password" })
      .populate("location")
      .lean<IVenue>()
      .exec();
  }

  async reApply(venueId: string): Promise<boolean> {
    const result = await VenueModel.updateOne(
      { _id: venueId },
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
    venueId: string,
    isAvailable: boolean
  ): Promise<boolean> {
    const result = await VenueModel.updateOne(
      { _id: venueId },
      {
        $set: {
          isAvailable,
        },
      }
    );
    return result.modifiedCount > 0;
  }

  async deleteVenue(venueId: string): Promise<boolean> {
    const deleted = await VenueModel.findByIdAndDelete(venueId);
    if (!deleted) {
      console.warn("Venue not found:", venueId);
      return false;
    }
    return true;
  }
  async getHostDashboardVenue(
    hostId: string | Types.ObjectId
  ): Promise<IVenue[]> {
    return await VenueModel.find({ host: hostId }).lean();
  }
}
