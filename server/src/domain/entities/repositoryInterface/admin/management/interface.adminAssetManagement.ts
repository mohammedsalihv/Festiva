import { IAssetBase } from "../../../serviceInterface/interface.asset";

export interface IAdminAssetManagementRepository {
  findAssets(typeOfAsset: string): Promise<IAssetBase[]>;
  findAssetById(id: string, typeOfAsset: string): Promise<IAssetBase | null>;
  assetApprove(
    id: string,
    typeOfAsset: string,
    assetStatus: string
  ): Promise<{ _id: string; hostId: string } | null>;
  assetReject(
    id: string,
    typeOfAsset: string,
    assetStatus: string
  ): Promise<{ _id: string; hostId: string } | null>;
}
