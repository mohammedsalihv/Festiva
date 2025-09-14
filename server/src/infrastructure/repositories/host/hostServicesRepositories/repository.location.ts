import { Types } from "mongoose";
import { ILocationRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostBaseRepositoryInterfaces/interface.locationRepostory";
import { ILocation } from "../../../../domain/baseInterfaces/baseServicesInterfaces/interface.location";
import { LocationModel } from "../../../../domain/entities/databaseModels/baseModels/baseServicesModels/locationModel";
export class LocationRepository implements ILocationRepository {
  async addLocation(location: ILocation): Promise<ILocation> {
    const newLocation = new LocationModel(location);
    const savedLocation = await newLocation.save();
    return savedLocation.toObject();
  }
  async findLocation(
    locationId: string | Types.ObjectId
  ): Promise<ILocation | null> {
    return await LocationModel.findById(locationId);
  }
}
