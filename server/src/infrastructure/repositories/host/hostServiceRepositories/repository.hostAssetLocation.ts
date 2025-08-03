import { IHostAssetLocationRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.hostAssetLocationRepostory";
import { ILocation } from "../../../../domain/entities/serviceInterface/host/interface.location";
import { LocationModel } from "../../../../domain/models/host/hostServiceModels/locationModel";

export class HostAssetLocationRepository
  implements IHostAssetLocationRepository
{
  async addLocation(location: ILocation): Promise<ILocation> {
    try {
      const newLocation = new LocationModel(location);

      const savedLocation = await newLocation.save();

      return savedLocation.toObject();
    } catch (error: any) {
      throw new Error(`Failed to add location: ${error.message}`);
    }
  }
}
