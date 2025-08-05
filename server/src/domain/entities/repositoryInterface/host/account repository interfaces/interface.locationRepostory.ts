import { ILocation } from "../../../serviceInterface/host/interface.location";

export interface ILocationRepository {
    addLocation(location: ILocation): Promise<ILocation>;
  }