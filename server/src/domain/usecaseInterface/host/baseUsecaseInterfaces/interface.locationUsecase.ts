import { ILocation } from "../../../entities/serviceInterface/host/interface.location";

export interface ILocationUseCase {
  execute(location: ILocation): Promise<ILocation>;
}
