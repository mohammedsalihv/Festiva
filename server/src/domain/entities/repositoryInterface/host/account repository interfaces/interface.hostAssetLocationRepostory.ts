import { ILocation } from "../../../serviceInterface/host/interface.location";

export interface IHostAssetLocationRepository {
    addLocation(location: ILocation): Promise<ILocation>;
  }