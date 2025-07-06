import { IAssetBase } from "../../../../domain/entities/serviceInterface/interface.asset";
import { IAdminAssetManagementRepository } from "../../../../domain/entities/repositoryInterface/admin/management/interface.adminAssetManagement";
import { IAdminAssetManagementUseCase } from "../../../../domain/usecaseInterface/admin/interface.adminAssetManagementUseCase";

export class AdminAssetManagementUseCase
  implements IAdminAssetManagementUseCase
{
  constructor(private repository: IAdminAssetManagementRepository) {}

  async execute(typeOfAsset: string): Promise<IAssetBase[]> {
    return await this.repository.findAssets(typeOfAsset);
  }

  async fetchAssetById(
    id: string,
    typeOfAsset: string
  ): Promise<IAssetBase | null> {
    return await this.repository.findAssetById(id, typeOfAsset);
  }

  async assetApprove(
    id: string,
    typeOfAsset: string,
    assetStatus: string
  ): Promise<{ _id: string; hostId: string } | null> {
    return await this.repository.assetApprove(id, typeOfAsset, assetStatus);
  }

  async assetReject(
    id: string,
    typeOfAsset: string,
    assetStatus: string
  ): Promise<{ _id: string; hostId: string } | null> {
    return await this.repository.assetReject(id, typeOfAsset, assetStatus);
  }
}
