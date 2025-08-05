import { ILocationRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.locationRepostory";
import { ILocation } from "../../../../domain/entities/serviceInterface/host/interface.location";
import { LocationModel } from "../../../../domain/models/host/hostServiceModels/locationModel";

export class LocationRepository implements ILocationRepository {
  async addLocation(location: ILocation): Promise<ILocation> {
    const newLocation = new LocationModel(location);
    const savedLocation = await newLocation.save();
    return savedLocation.toObject();
  }
}
