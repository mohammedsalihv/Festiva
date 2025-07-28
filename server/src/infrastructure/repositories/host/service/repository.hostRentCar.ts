import { IRentCar } from "../../../../domain/entities/serviceInterface/interface.rentCar";
import { IHostRentCarRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.hostRentCarRepository";
import { RentCarModel } from "../../../../domain/models/rentCarModel";

export class HostRentCarRepository implements IHostRentCarRepository {
  async addRentCar(rentCar: IRentCar): Promise<IRentCar> {
    try {
      const newRentCar = new RentCarModel(rentCar);
      await newRentCar.save();
      return newRentCar;
    } catch (error) {
      throw new Error(`Error saving new car: ${error}`);
    }
  }
  async findCarById(rentcarId: string): Promise<IRentCar | null> {
    return await RentCarModel.findById(rentcarId)
      .populate({ path: "host", select: "-password" })
      .populate("location")
      .lean<IRentCar>()
      .exec();
  }
}
