import { IRentCar } from "../../../../domain/entities/serviceInterface/interface.rentCar";
import { IAdminRentCarRepository } from "../../../../domain/entities/repositoryInterface/admin/interface.adminRentCarRepository";
import { RentCarModel } from "../../../../domain/models/rentCarModel";

export class AdminRentCarRepository implements IAdminRentCarRepository {
  carDetails(rentcarId: string): Promise<IRentCar | null> {
    return RentCarModel.findById(rentcarId)
      .populate({ path: "host", select: "-password" })
      .populate("location")
      .lean<IRentCar>()
      .exec();
  }
}
