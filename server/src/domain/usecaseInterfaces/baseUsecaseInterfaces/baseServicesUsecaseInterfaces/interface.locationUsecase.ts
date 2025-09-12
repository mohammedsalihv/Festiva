import { ILocation } from "../../../baseInterfaces/baseServicesInterfaces/interface.location";

export interface ILocationUseCase {
  execute(location: ILocation): Promise<ILocation>;
}
