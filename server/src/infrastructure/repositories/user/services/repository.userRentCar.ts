import { IUserRentCarRepository } from "../../../../domain/entities/repositoryInterface/user/services/interface.userRentCarRepository";
import { RentCarModel } from "../../../../domain/models/rentCarModel";
import { mapRentCarToBase } from "../../../../domain/entities/serviceInterface/interface.rentCar";
import { IRentCarBase } from "../../../../domain/entities/serviceInterface/interface.rentCar";

export class UserRentCarRepository implements IUserRentCarRepository {
  async findAllRentCars(): Promise<IRentCarBase[]> {
    const cars = await RentCarModel.find({ status: "approved" })
      .populate("location", "city state country")
      .lean();

    return cars.map(mapRentCarToBase);
  }
}
