import { IAdminVenueRepository } from "../../../../domain/entities/repositoryInterface/admin/interface.adminVenueRepository";
import { VenueModel } from "../../../../domain/models/venueModel";
import { IVenue } from "../../../../domain/entities/serviceInterface/interface.venue";

export class AdminVenueRepository implements IAdminVenueRepository {
  async venueDetails(venueId: string): Promise<IVenue | null> {
    return VenueModel.findById(venueId)
      .populate({ path: "host", select: "-password" }) 
      .populate("location")
      .lean<IVenue>()
      .exec();
  }
}
