import { IAssetBase } from "../../serviceInterface/interface.asset";

export interface IAssetManagementRepository {
  findAssets(typeOfAsset: string): Promise<IAssetBase[]>;
  findAssetById(id: string, typeOfAsset: string): Promise<IAssetBase | null>;
  assetApprove(id: string, typeOfAsset:string , assetStatus: string): Promise<boolean>;
  assetReject(id: string, typeOfAsset:string ,assetStatus: string): Promise<boolean>;
}
