import { IHostAssetBase } from "../../../entities/serviceInterface/host/interface.hostAssetsBase";

export interface IAdminAssetManagementUseCase {
  execute(typeOfAsset: string): Promise<IHostAssetBase[]>;
  fetchAssetById(
    id: string,
    typeOfAsset: string
  ): Promise<IHostAssetBase | null>;
  assetApprove(
    id: string,
    typeOfAsset: string,
    assetStatus: string
  ): Promise<{ _id: string; hostId: string } | null>;
  assetReject(
    id: string,
    typeOfAsset: string,
    assetStatus: string,
    reason: string
  ): Promise<{ _id: string; hostId: string } | null>;
}
