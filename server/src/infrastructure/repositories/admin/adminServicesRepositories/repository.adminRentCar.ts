import { IRentCar } from "../../../../domain/baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.rentCar";
import { IAdminRentCarRepository } from "../../../../domain/repositoryInterfaces/adminRepositoryInterfaces/adminServicesRepositoryInterfaces/interface.adminRentCarRepository";
import { RentCarModel } from "../../../../domain/entities/databaseModels/hostModels/hostServicesModels/rentCarModel";

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
