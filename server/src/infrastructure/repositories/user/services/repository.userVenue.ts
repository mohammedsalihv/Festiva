import { IUserVenueRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userVenueRepository";
import {
  IVenue,
  IVenueBase,
} from "../../../../domain/entities/serviceInterface/interface.venue";
import { VenueModel } from "../../../../domain/models/venueModel";
import { mapVenueToBase } from "../../../../domain/entities/serviceInterface/interface.venue";

export class UserVenueRepository implements IUserVenueRepository {
  async findAllVenues(): Promise<IVenueBase[]> {
    const venues = await VenueModel.find({ status: "approved" })
      .populate("location", "city state country")
      .lean();

    return venues.map(mapVenueToBase);
  }

  async fetchVenueDetailsById(venueId: string): Promise<IVenue | null> {
    return VenueModel.findById(venueId)
      .populate({ path: "host", select: "-password" })
      .populate("location")
      .lean<IVenue>()
      .exec();
  }
}
