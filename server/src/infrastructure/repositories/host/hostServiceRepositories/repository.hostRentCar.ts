import { IRentCar } from "../../../../domain/entities/serviceInterface/host/interface.rentCar";
import { IHostRentCarRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostRentCarRepository";
import { RentCarModel } from "../../../../domain/models/host/hostServiceModels/rentCarModel";
import { Types } from "mongoose";

export class HostRentCarRepository implements IHostRentCarRepository {
  async addRentCar(rentCar: IRentCar): Promise<IRentCar> {
    const newRentCar = new RentCarModel(rentCar);
    await newRentCar.save();
    return newRentCar;
  }

  async findCarById(rentcarId: string): Promise<IRentCar | null> {
    return await RentCarModel.findById(rentcarId)
      .populate({ path: "host", select: "-password" })
      .populate("location")
      .lean<IRentCar>()
      .exec();
  }

  async reApply(rentcarId: string): Promise<boolean> {
    const result = await RentCarModel.updateOne(
      { _id: rentcarId },
      {
        $set: {
          isReapplied: true,
          rejectedReason: "",
          status: "pending",
        },
      }
    );
    return result.modifiedCount > 0;
  }

  async updateAvailability(
    rentcarId: string,
    isAvailable: boolean
  ): Promise<boolean> {
    const result = await RentCarModel.updateOne(
      { _id: rentcarId },
      {
        $set: {
          isAvailable,
        },
      }
    );
    return result.modifiedCount > 0;
  }

  async deleteRentcar(rentcarId: string): Promise<boolean> {
    const deleted = await RentCarModel.findByIdAndDelete(rentcarId);
    if (!deleted) {
      console.warn("Venue not found:", rentcarId);
      return false;
    }
    return true;
  }

  async getHostDashboardRentCar(
    hostId: string | Types.ObjectId
  ): Promise<IRentCar[]> {
    return await RentCarModel.find({ host: hostId }).lean();
  }
}
