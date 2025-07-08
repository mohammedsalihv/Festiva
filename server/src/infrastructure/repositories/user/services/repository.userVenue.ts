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
  async findVenuesWithFilters(
    filters: any,
    page: number,
    limit: number
  ): Promise<{
    data: IVenueBase[];
    totalPages: number;
    currentPage: number;
  }> {
    const query: Record<string, any> = { status: "approved" };

    if (filters.shift) query.shift = filters.shift;

    if (filters.timeSlots?.length)
      query["timeSlots"] = { $in: filters.timeSlots };

    if (filters.venueFeaturesOptions?.length) {
      query.features = {
        $in: filters.venueFeaturesOptions.map((feature: string) => ({
          $regex: feature,
          $options: "i",
        })),
      };
    }

    if (filters.parkingFeatures?.length) {
      query.features = {
        $in: filters.parkingFeatures.map((feature: string) => ({
          $regex: feature,
          $options: "i",
        })),
      };
    }

    if (filters.price) {
      query.$expr = {
        $lte: [{ $toDouble: "$rent" }, filters.price],
      };
    }

    const total = await VenueModel.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;

    const venues = await VenueModel.find(query)
      .populate("location", "city state country")
      .skip(skip)
      .limit(limit)
      .lean();

    return {
      data: venues.map(mapVenueToBase),
      totalPages,
      currentPage: page,
    };
  }

  async sortVenues(
    sorts: any,
    page: number,
    limit: number
  ): Promise<{
    data: IVenueBase[];
    totalPages: number;
    currentPage: number;
  }> {
    const sortQuery: Record<string, 1 | -1> = {};

    if (sorts.rent) sortQuery.rent = sorts.rent === "low-high" ? 1 : -1;
    if (sorts.capacity)
      sortQuery.capacity = sorts.capacity === "low-high" ? 1 : -1;
    if (sorts.squareFeet)
      sortQuery.squareFeet = sorts.squareFeet === "low-high" ? 1 : -1;
    if (sorts.name) sortQuery.venueName = sorts.name === "asc" ? 1 : -1;
    if (sorts.createdAt)
      sortQuery.createdAt = sorts.createdAt === "asc" ? 1 : -1;

    const query = { status: "approved" };
    const total = await VenueModel.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;

    const venues = await VenueModel.find(query)
      .sort(sortQuery)
      .populate("location", "city state country")
      .skip(skip)
      .limit(limit)
      .lean();

    return {
      data: venues.map(mapVenueToBase),
      totalPages,
      currentPage: page,
    };
  }
}
