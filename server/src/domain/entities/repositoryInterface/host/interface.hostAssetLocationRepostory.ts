import { ILocation } from "../../serviceInterface/interface.location";

export interface IHostAssetLocationRepository {
    addLocation(location: ILocation): Promise<ILocation>;
  }