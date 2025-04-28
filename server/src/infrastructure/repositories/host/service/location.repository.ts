import { ILocationRepository } from "../../../../domain/entities/repositoryInterface/host/locationRepostory"; // Import the interface
import { ILocation } from "../../../../domain/entities/modelInterface/location.interface"; // Import the ILocation interface for the data structure
import { LocationModel } from "../../../../domain/models/locationModel";

export class LocationRepository implements ILocationRepository {
  async addLocation(location: ILocation): Promise<ILocation> {
    try {
      const newLocation = new LocationModel(location);

      const savedLocation = await newLocation.save();

      return savedLocation.toObject(); 
    } catch (error:any) {
      throw new Error(`Failed to add location: ${error.message}`);
    }
  }

}
