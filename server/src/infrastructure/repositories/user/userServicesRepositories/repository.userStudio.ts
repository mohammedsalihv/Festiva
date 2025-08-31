import { IUserStudioRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userStudioRepository";
import {
  IStudio,
  IStudioBase,
} from "../../../../domain/entities/serviceInterface/host/interface.studio";
import { StudioModel } from "../../../../domain/models/host/hostServiceModels/studioModel";
import { LocationModel } from "../../../../domain/models/host/hostServiceModels/locationModel";
import { mapStudioToBase } from "../../../../domain/entities/serviceInterface/host/interface.studio";

export class UserStudioRepository implements IUserStudioRepository {
  async findAllStudios(): Promise<IStudioBase[]> {
    const studios = await StudioModel.find({ status: "approved" })
      .populate("location", "city state country")
      .lean();

    return studios.map(mapStudioToBase);
  }

  async fetchStudioDetailsById(studioId: string): Promise<IStudio | null> {
    return StudioModel.findById(studioId)
      .populate({ path: "host", select: "-password" })
      .populate("location")
      .lean<IStudio>()
      .exec();
  }

  async findByFilters(
    filters: Record<string, any>,
    page: number,
    limit: number
  ): Promise<{ data: IStudioBase[]; totalPages: number; currentPage: number }> {
    const query: any = { status: "approved" };

    if (filters.lat && filters.lng) {
      const radiusInMeters = (filters.radius || 50) * 1000; // default 50km

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

    if (filters.studioServiceFeaturesOptions?.length) {
      const regexArray = filters.studioServiceFeaturesOptions.map(
        (f: string) => ({
          $regex: f,
          $options: "i",
        })
      );
      query["serviceFeatures"] = { $in: regexArray };
    }

    if (filters.packageSearch) {
      const searchRegex = new RegExp(filters.packageSearch, "i");
      query.packages = {
        $elemMatch: {
          $or: [
            { equipments: { $elemMatch: { $regex: searchRegex } } },
            { packageIncludes: { $elemMatch: { $regex: searchRegex } } },
          ],
        },
      };
    }

    if (filters.equipment) query["packages.equipments"] = filters.equipment;
    if (filters.manPower) query["packages.manPower"] = filters.manPower;
    if (filters.payment) query["packages.payment"] = filters.payment;
    if (filters.timeSlots?.length)
      query["timeSlots"] = { $in: filters.timeSlots };

    if (filters.price) {
      query.packages = {
        $elemMatch: {
          $expr: {
            $lte: [{ $toDouble: "$payment" }, filters.price],
          },
        },
      };
    }

    if (filters.keyword) {
      query["studioName"] = { $regex: filters.keyword, $options: "i" };
    }

    const total = await StudioModel.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;

    const studios = await StudioModel.find(query)
      .populate("location", "city state country")
      .skip(skip)
      .limit(limit)
      .lean();

    return {
      data: studios.map(mapStudioToBase),
      totalPages,
      currentPage: page,
    };
  }

  async sortStudios(
    sorts: any,
    page: number,
    limit: number
  ): Promise<{ data: IStudioBase[]; totalPages: number; currentPage: number }> {
    const pipeline: any[] = [{ $match: { status: "approved" } }];

    if (sorts.packagePrice) {
      pipeline.push({
        $addFields: {
          convertedPackagePrice: { $toDouble: "$packages.0.payment" },
        },
      });
    }

    const sortStage: Record<string, 1 | -1> = {};

    if (sorts.name) sortStage["studioName"] = sorts.name === "asc" ? 1 : -1;
    if (sorts.packagePrice)
      sortStage["convertedPackagePrice"] =
        sorts.packagePrice === "low-high" ? 1 : -1;
    if (sorts.createdAt)
      sortStage["createdAt"] = sorts.createdAt === "asc" ? 1 : -1;
    if (sorts.location)
      sortStage["location.state"] = sorts.location === "asc" ? 1 : -1;

    pipeline.push({ $sort: sortStage });

    pipeline.push({
      $lookup: {
        from: "locations",
        localField: "location",
        foreignField: "_id",
        as: "location",
      },
    });

    pipeline.push({ $unwind: "$location" });

    // Count total
    const countPipeline = [...pipeline, { $count: "total" }];
    const totalResult = await StudioModel.aggregate(countPipeline);
    const total = totalResult[0]?.total || 0;
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;

    pipeline.push({ $skip: skip }, { $limit: limit });

    const studios = await StudioModel.aggregate(pipeline);

    return {
      data: studios.map(mapStudioToBase),
      totalPages,
      currentPage: page,
    };
  }
}
