import { IUserCatersRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userCatersRepository";
import {
  ICaters,
  ICatersBase,
} from "../../../../domain/entities/serviceInterface/interface.caters";
import { CatersModel } from "../../../../domain/models/catersModel";
import { mapCatersToBase } from "../../../../domain/entities/serviceInterface/interface.caters";

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


  async filterCaters(filters: Record<string, any>): Promise<ICatersBase[]> {
    const query: Record<string, any> = { status: "approved" };

 
    if (filters.city) query["location.city"] = filters.city;
    if (filters.state) query["location.state"] = filters.state;
    if (filters.country) query["location.country"] = filters.country;

   
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

    const caters = await CatersModel.find(query)
      .populate("location", "city state country")
      .lean();

    return caters.map(mapCatersToBase);
  }



  async sortCaters(sorts: any): Promise<ICatersBase[]> {
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

    const caters = await CatersModel.aggregate(pipeline);
    return caters.map(mapCatersToBase);
  }
}
