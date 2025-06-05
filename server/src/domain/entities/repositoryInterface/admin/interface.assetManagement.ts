import { IVenue } from "../../serviceInterface/interface.venue";

export interface IAssetManagementRepository {
  findAllAssets(): Promise<IVenue[]>;
}
