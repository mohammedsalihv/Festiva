import { IUserRentCarRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userRentCarRepository";
import { RentCarModel } from "../../../../domain/models/rentCarModel";
import {
  IRentCar,
  mapRentCarToBase,
} from "../../../../domain/entities/serviceInterface/interface.rentCar";
import { IRentCarBase } from "../../../../domain/entities/serviceInterface/interface.rentCar";

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



  async findByFilters(filters: Record<string, any>): Promise<IRentCarBase[]> {
    const pipeline: any[] = [{ $match: { status: "approved" } }];

    
    pipeline.push({
      $addFields: {
        modelInt: { $toInt: "$model" },
        seatsInt: { $toInt: "$seats" },
      },
    });

    const match: Record<string, any> = {};

   
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

   
    const rentCars = await RentCarModel.aggregate(pipeline);
    return rentCars.map(mapRentCarToBase);
  }

  async sortRentCars(sorts: any): Promise<IRentCarBase[]> {
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

    const result = await RentCarModel.aggregate(pipeline);
    return result.map(mapRentCarToBase);
  }
}
