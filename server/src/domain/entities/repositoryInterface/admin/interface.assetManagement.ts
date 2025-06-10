import { IAssetBase } from "../../serviceInterface/interface.asset";

export interface IAssetManagementRepository {
  findAssets(typeOfAsset: string): Promise<IAssetBase[]>;
  findAssetById(id: string, typeOfAsset: string): Promise<IAssetBase | null>;
}
