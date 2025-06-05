import { IVenue } from "../entities/serviceInterface/interface.venue";

export interface IAssetManagementUseCase {
  execute(): Promise<IVenue[]>;
}
