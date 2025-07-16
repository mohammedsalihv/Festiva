import { IUserCatersRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userCatersRepository";
import {
  ICaters,
  ICatersBase,
} from "../../../../domain/entities/serviceInterface/interface.caters";
import { CatersModel } from "../../../../domain/models/catersModel";
import { mapCatersToBase } from "../../../../domain/entities/serviceInterface/interface.caters";
import { LocationModel } from "../../../../domain/models/locationModel";

export class UserCatersRepository implements IUserCatersRepository {
  async findAllCaters(): Promise<ICatersBase[]> {
    const caters = await CatersModel.find({ status: "approved" })
      .populate("location", "city state country")
      .lean();

    return caters.map(mapCatersToBase);
  }
  async fetchCatersById(catersId: string): Promise<ICaters | null> {
    return CatersModel.findById(catersId)
      .populate({ path: "host", select: "-password" })
      .populate("location")
      .lean<ICaters>()
      .exec();
  }

 async filterCaters(
  filters: Record<string, any>,
  page: number,
  limit: number
): Promise<{ data: ICatersBase[]; totalPages: number; currentPage: number }> {
  const query: Record<string, any> = { status: "approved" };

  // Location-based filter using coordinates
  if (filters.lat && filters.lng) {
    const radiusInMeters = (filters.radius || 50) * 1000; // default 50km

    // Step 1: Find matching location IDs within radius
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
    query["location"] = { $in: nearbyLocationIds };
  }

  // Other filters
  if (filters.serviceTypes?.length) {
    query["serviceTypes"] = {
      $in: filters.serviceTypes.map((item: string) => ({
        $regex: item,
        $options: "i",
      })),
    };
  }

  if (filters.catersFeatures?.length) {
    query["features"] = {
      $in: filters.catersFeatures.map((item: string) => ({
        $regex: item,
        $options: "i",
      })),
    };
  }

  if (filters.timeSlots?.length) {
    query["timeSlots"] = { $in: filters.timeSlots };
  }

  if (filters.price) {
    query.$expr = {
      $lte: [{ $toDouble: "$totalAmount" }, filters.price],
    };
  }

  const total = await CatersModel.countDocuments(query);
  const totalPages = Math.ceil(total / limit);
  const skip = (page - 1) * limit;

  const caters = await CatersModel.find(query)
    .populate("location", "houseNo street district city state country zip coordinates")
    .skip(skip)
    .limit(limit)
    .lean();

  return {
    data: caters.map(mapCatersToBase),
    totalPages,
    currentPage: page,
  };
}


  async sortCaters(
    sorts: any,
    page: number,
    limit: number
  ): Promise<{ data: ICatersBase[]; totalPages: number; currentPage: number }> {
    const matchStage = { $match: { status: "approved" } };

    const pipeline: any[] = [matchStage];

    const needsNumericSort =
      sorts.totalAmount || sorts.charge || sorts.manpower;

    if (needsNumericSort) {
      pipeline.push({
        $addFields: {
          totalAmountNum: { $toDouble: "$totalAmount" },
          chargeNum: { $toDouble: "$charge" },
          manpowerNum: { $toInt: "$manpower" },
        },
      });
    }

    const sortStage: Record<string, 1 | -1> = {};

    if (sorts.name) sortStage["catersName"] = sorts.name === "asc" ? 1 : -1;
    if (sorts.totalAmount)
      sortStage["totalAmountNum"] = sorts.totalAmount === "low-high" ? 1 : -1;
    if (sorts.charge)
      sortStage["chargeNum"] = sorts.charge === "low-high" ? 1 : -1;
    if (sorts.manpower)
      sortStage["manpowerNum"] = sorts.manpower === "low-high" ? 1 : -1;
    if (sorts.createdAt)
      sortStage["createdAt"] = sorts.createdAt === "asc" ? 1 : -1;

    pipeline.push({ $sort: sortStage });

    pipeline.push(
      {
        $lookup: {
          from: "locations",
          localField: "location",
          foreignField: "_id",
          as: "location",
        },
      },
      { $unwind: "$location" }
    );
    const countPipeline = [...pipeline, { $count: "total" }];
    const countResult = await CatersModel.aggregate(countPipeline);
    const total = countResult[0]?.total || 0;
    const totalPages = Math.ceil(total / limit);

    pipeline.push({ $skip: (page - 1) * limit });
    pipeline.push({ $limit: limit });

    const caters = await CatersModel.aggregate(pipeline);

    return {
      data: caters.map(mapCatersToBase),
      totalPages,
      currentPage: page,
    };
  }
}
