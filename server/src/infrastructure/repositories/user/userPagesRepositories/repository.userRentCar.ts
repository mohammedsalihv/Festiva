import { IUserRentCarRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userRentCarRepository";
import { RentCarModel } from "../../../../domain/models/host/hostServiceModels/rentCarModel";
import {
  IRentCar,
  mapRentCarToBase,
} from "../../../../domain/entities/serviceInterface/host/interface.rentCar";
import { IRentCarBase } from "../../../../domain/entities/serviceInterface/host/interface.rentCar";
import { LocationModel } from "../../../../domain/models/host/hostServiceModels/locationModel";

export class UserRentCarRepository implements IUserRentCarRepository {
  async findAllRentCars(): Promise<IRentCarBase[]> {
    const cars = await RentCarModel.find({ status: "approved" })
      .populate("location", "city state country")
      .lean();

    return cars.map(mapRentCarToBase);
  }

  async fetchRentCarDetailsById(rentcarId: string): Promise<IRentCar | null> {
    return RentCarModel.findById(rentcarId)
      .populate({ path: "host", select: "-password" })
      .populate("location")
      .lean<IRentCar>()
      .exec();
  }

  async findByFilters(
    filters: Record<string, any>,
    page: number,
    limit: number
  ): Promise<{
    data: IRentCarBase[];
    totalPages: number;
    currentPage: number;
  }> {
    const pipeline: any[] = [{ $match: { status: "approved" } }];

    pipeline.push({
      $addFields: {
        modelInt: { $toInt: "$model" },
        seatsInt: { $toInt: "$seats" },
      },
    });

    const match: Record<string, any> = {};


    if(filters.lat && filters.lng) {
      const radiusInMeters = (filters.radius || 50) * 1000;

      const nearbyLocations = await LocationModel.find({
        coordinates:{
          $near:{
            $geometry:{
              type:"Point",
              coordinates:[filters.lng , filters.lat]
            },
            $maxDistance:radiusInMeters
          }
        }
      }).select("_id")

      const nearbyLocationIds = nearbyLocations.map((loc) => loc._id);
      match["location"] = {$in:nearbyLocationIds};
    }

    if (filters.make?.length) {
      match.make = { $in: filters.make };
    }

    if (filters.transmission) {
      match.transmission = filters.transmission;
    }

    if (filters.fuel) {
      match.fuel = filters.fuel;
    }

    if (filters.seats) {
      match.seatsInt = parseInt(filters.seats);
    }

    if (filters.modelStart || filters.modelEnd) {
      match.modelInt = {};
      if (filters.modelStart)
        match.modelInt.$gte = parseInt(filters.modelStart);
      if (filters.modelEnd) match.modelInt.$lte = parseInt(filters.modelEnd);
    }

    if (filters.rentCarFeatures?.length) {
      const regexArray = filters.rentCarFeatures.map((item: string) => ({
        $regex: item,
        $options: "i",
      }));
      match.$or = [
        { carFeatures: { $in: regexArray } },
        { additionalFeatures: { $in: regexArray } },
      ];
    }

    if (filters.timeSlots?.length) {
      match["timeSlots"] = { $in: filters.timeSlots };
    }

    if (filters.price) {
      match.$expr = {
        $lte: [{ $toDouble: "$rent" }, filters.price],
      };
    }

    pipeline.push({ $match: match });

    const countPipeline = [...pipeline, { $count: "total" }];
    const totalResult = await RentCarModel.aggregate(countPipeline);
    const total = totalResult[0]?.total || 0;
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;

    pipeline.push({ $skip: skip }, { $limit: limit });

    const rentCars = await RentCarModel.aggregate(pipeline);
    return {
      data: rentCars.map(mapRentCarToBase),
      totalPages,
      currentPage: page,
    };
  }

  async sortRentCars(
    sorts: any,
    page: number,
    limit: number
  ): Promise<{
    data: IRentCarBase[];
    totalPages: number;
    currentPage: number;
  }> {
    const pipeline: any[] = [{ $match: { status: "approved" } }];

    if (sorts.rent || sorts.deposite) {
      pipeline.push({
        $addFields: {
          convertedRent: { $toDouble: "$rent" },
          convertedDeposite: { $toDouble: "$deposite" },
        },
      });
    }

    const sortStage: Record<string, 1 | -1> = {};

    if (sorts.businessName)
      sortStage.businessName = sorts.businessName === "asc" ? 1 : -1;
    if (sorts.carName) sortStage.carName = sorts.carName === "asc" ? 1 : -1;
    if (sorts.rent)
      sortStage.convertedRent = sorts.rent === "low-high" ? 1 : -1;
    if (sorts.deposite)
      sortStage.convertedDeposite = sorts.deposite === "low-high" ? 1 : -1;
    if (sorts.createdAt)
      sortStage.createdAt = sorts.createdAt === "asc" ? 1 : -1;

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
    const totalResult = await RentCarModel.aggregate(countPipeline);
    const total = totalResult[0]?.total || 0;
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;

    pipeline.push({ $skip: skip }, { $limit: limit });

    const result = await RentCarModel.aggregate(pipeline);
    return {
      data: result.map(mapRentCarToBase),
      totalPages,
      currentPage: page,
    };
  }
}
