import { IAdminVenueRepository } from "../../../../domain/entities/repositoryInterface/admin/services/interface.adminVenueRepository";
import { VenueModel } from "../../../../domain/models/host/hostServiceModels/venueModel";
import { IVenue } from "../../../../domain/entities/serviceInterface/host/interface.venue";

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
