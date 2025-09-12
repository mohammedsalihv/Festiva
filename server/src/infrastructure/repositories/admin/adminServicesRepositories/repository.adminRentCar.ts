import { IRentCar } from "../../../../domain/entities/serviceInterface/host/interface.rentCar";
import { IAdminRentCarRepository } from "../../../../domain/entities/repositoryInterface/admin/services/interface.adminRentCarRepository";
import { RentCarModel } from "../../../../domain/models/host/hostServiceModels/rentCarModel";

export class AdminRentCarRepository implements IAdminRentCarRepository {
  carDetails(rentcarId: string): Promise<IRentCar | null> {
    return RentCarModel.findById(rentcarId)
      .populate({ path: "host", select: "-password" })
      .populate("location")
      .lean<IRentCar>()
      .exec();
  }
  async getAllRentCars(): Promise<IRentCar[]> {
    return await RentCarModel.find().lean();
  }
}
