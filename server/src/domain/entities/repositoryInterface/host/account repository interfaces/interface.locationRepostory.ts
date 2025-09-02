import { Types } from "mongoose";
import { ILocation } from "../../../serviceInterface/host/interface.location";

export interface ILocationRepository {
  addLocation(location: ILocation): Promise<ILocation>;
  findLocation(locationId: string | Types.ObjectId): Promise<ILocation | null>;
}
