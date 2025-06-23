import { IRentCar } from "../../../../domain/entities/serviceInterface/interface.rentCar";
import { IHostRentCarRepository } from "../../../../domain/entities/repositoryInterface/host/interface.hostRentCarRepository";
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
}
