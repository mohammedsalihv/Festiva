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
    const query: Record<string, any> = {
      status: "approved",
    };

    if (filters.shift) {
      query.shift = filters.shift;
    }

    if (filters.timeSlots?.length) {
      query["timeSlots"] = { $in: filters.timeSlots };
    }

    if (filters.venueFeaturesOptions?.length) {
      const regexArray = filters.venueFeaturesOptions.map(
        (feature: string) => ({
          $regex: feature,
          $options: "i",
        })
      );
      query.features = { $in: regexArray };
    }

    if (filters.parkingFeatures?.length) {
      const regexArray = filters.parkingFeatures.map((feature: string) => ({
        $regex: feature,
        $options: "i",
      }));
      query.features = { $in: regexArray };
    }

    if (filters.price) {
      query.$expr = {
        $lte: [{ $toDouble: "$rent" }, filters.price],
      };
    }

    const venues = await VenueModel.find(query)
      .populate("location", "city state country")
      .lean();

    return venues.map(mapVenueToBase);
  }

  async sortVenues(sorts: any): Promise<IVenueBase[]> {
    const sortQuery: Record<string, 1 | -1> = {};

    if (sorts.rent) sortQuery.rent = sorts.rent === "low-high" ? 1 : -1;
    if (sorts.capacity)
      sortQuery.capacity = sorts.capacity === "low-high" ? 1 : -1;
    if (sorts.squareFeet)
      sortQuery.squareFeet = sorts.squareFeet === "low-high" ? 1 : -1;
    if (sorts.name) sortQuery.venueName = sorts.name === "asc" ? 1 : -1;
    if (sorts.createdAt)
      sortQuery.createdAt = sorts.createdAt === "asc" ? 1 : -1;

    const venues = await VenueModel.find({ status: "approved" })
      .sort(sortQuery)
      .populate("location", "city state country")
      .lean();

    return venues.map(mapVenueToBase);
  }
}
