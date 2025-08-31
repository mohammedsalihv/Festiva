import { IUserVenueRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userVenueRepository";
import {
  IVenue,
  IVenueBase,
} from "../../../../domain/entities/serviceInterface/host/interface.venue";
import { VenueModel } from "../../../../domain/models/host/hostServiceModels/venueModel";
import { LocationModel } from "../../../../domain/models/host/hostServiceModels/locationModel";
import { mapVenueToBase } from "../../../../domain/entities/serviceInterface/host/interface.venue";

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
    const andConditions: any[] = [];

    andConditions.push({ status: "approved" });

    if (filters.lat && filters.lng) {
      const radiusInMeters = (filters.radius || 50) * 1000;

      const nearbyLocations = await LocationModel.find({
        coordinates: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [filters.lng, filters.lat],
            },
            $maxDistance: radiusInMeters,
          },
        },
      }).select("_id");

      const nearbyLocationIds = nearbyLocations.map((loc) => loc._id);

      andConditions.push({ location: { $in: nearbyLocationIds } });
    }

    if (filters.shift) {
      andConditions.push({ shift: filters.shift });
    }

    if (filters.timeSlots?.length) {
      andConditions.push({ timeSlots: { $in: filters.timeSlots } });
    }

    if (filters.features?.length || filters.parkingFeatures?.length) {
      const orConditions: any[] = [];

      if (filters.features?.length) {
        orConditions.push(
          ...filters.features.map((feature: string) => ({
            features: { $regex: feature, $options: "i" },
          }))
        );
      }

      if (filters.parkingFeatures?.length) {
        orConditions.push(
          ...filters.parkingFeatures.map((feature: string) => ({
            parkingFeatures: { $regex: feature, $options: "i" },
          }))
        );
      }

      if (orConditions.length > 0) {
        andConditions.push({ $or: orConditions });
      }
    }

    const price = Number(filters.price);
    if (!isNaN(price)) {
      andConditions.push({
        $expr: {
          $lte: [{ $toDouble: "$rent" }, price],
        },
      });
    }

    if (filters.keyword) {
      andConditions.push({
        venueName: { $regex: filters.keyword, $options: "i" },
      });
    }

    const finalQuery =
      andConditions.length === 1 ? andConditions[0] : { $and: andConditions };

    const skip = (page - 1) * limit;
    const total = await VenueModel.countDocuments(finalQuery);
    const totalPages = Math.ceil(total / limit);

    const venues = await VenueModel.find(finalQuery)
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
