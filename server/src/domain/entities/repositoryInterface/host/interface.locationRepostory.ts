import { ILocation } from "../../serviceInterface/interface.location";

export interface ILocationRepository {
    addLocation(location: ILocation): Promise<ILocation>;
  }