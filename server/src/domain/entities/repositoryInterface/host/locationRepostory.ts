import { ILocation } from "../../modelInterface/location.interface";

export interface ILocationRepository {
    addLocation(location: ILocation): Promise<ILocation>;
  }