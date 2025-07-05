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
  async findVenuesWithFilters(filters: any): Promise<IVenueBase[]> {
    const query: Record<string, any> = { status: "approved" };

    if (filters.state) query["location.state"] = filters.state;
    if (filters.city) query["location.city"] = filters.city;
    if (filters.country) query["location.country"] = filters.country;
    if (filters.features) query["features"] = { $in: filters.features };
    if (filters.minRent) query["rent"] = { $gte: filters.minRent };
    if (filters.maxRent)
      query["rent"] = { ...query["rent"], $lte: filters.maxRent };

    const venues = await VenueModel.find(query)
      .populate("location", "city state country")
      .lean();

    return venues.map(mapVenueToBase);
  }
}
