import { IAssetBase } from "../../../entities/serviceInterface/interface.asset";

export interface IAdminAssetManagementUseCase {
  execute(typeOfAsset: string): Promise<IAssetBase[]>;
  fetchAssetById(id: string, typeOfAsset: string): Promise<IAssetBase | null>;
  assetApprove(
    id: string,
    typeOfAsset: string,
    assetStatus: string
  ): Promise<{ _id: string; hostId: string } | null>;
  assetReject(
    id: string,
    typeOfAsset: string,
    assetStatus: string,
    reason:string
  ): Promise<{ _id: string; hostId: string } | null>;
}
