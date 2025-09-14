import { IAdminVenueRepository } from "../../../../domain/repositoryInterfaces/adminRepositoryInterfaces/adminServicesRepositoryInterfaces/interface.adminVenueRepository";
import { VenueModel } from "../../../../domain/entities/databaseModels/hostModels/hostServicesModels/venueModel";
import { IVenue } from "../../../../domain/baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.venue";

export class AdminVenueRepository implements IAdminVenueRepository {
  async venueDetails(venueId: string): Promise<IVenue | null> {
    return VenueModel.findById(venueId)
      .populate({ path: "host", select: "-password" })
      .populate("location")
      .lean<IVenue>()
      .exec();
  }
  async getAllVenues(): Promise<IVenue[]> {
    return await VenueModel.find().lean();
  }
}
