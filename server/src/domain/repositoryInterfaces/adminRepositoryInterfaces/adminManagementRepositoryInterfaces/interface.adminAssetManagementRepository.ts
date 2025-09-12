import { IAdminAssetBaseRepositoryDTO } from "../../baseRepositoryInterfaces/baseServicesRepositoryInterfaces/interface.assetBaseRepository";

export interface IAdminAssetManagementRepository {
  findAssets(typeOfAsset: string): Promise<IAdminAssetBaseRepositoryDTO[]>;

  findAssetById(
    id: string,
    typeOfAsset: string
  ): Promise<IAdminAssetBaseRepositoryDTO | null>;
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
