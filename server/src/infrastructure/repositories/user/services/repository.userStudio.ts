import { IUserStudioRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userStudioRepository";
import {
  IStudio,
  IStudioBase,
} from "../../../../domain/entities/serviceInterface/interface.studio";
import { StudioModel } from "../../../../domain/models/studioModel";
import { mapStudioToBase } from "../../../../domain/entities/serviceInterface/interface.studio";

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

  async findByFilters(filters: Record<string, any>): Promise<IStudioBase[]> {
    const query: any = { status: "approved" };

    if (filters.city) query["location.city"] = filters.city;
    if (filters.state) query["location.state"] = filters.state;
    if (filters.country) query["location.country"] = filters.country;

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

    const studios = await StudioModel.find(query)
      .populate("location", "city state country")
      .lean();

    return studios.map(mapStudioToBase);
  }

  async sortStudios(sorts: any): Promise<IStudioBase[]> {
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

    const studios = await StudioModel.aggregate(pipeline);
    return studios.map(mapStudioToBase);
  }
}
