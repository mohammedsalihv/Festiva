import { IAssetBase } from "../../../domain/entities/serviceInterface/interface.asset";
import { IAssetManagementRepository } from "../../../domain/entities/repositoryInterface/admin/interface.assetManagement";
import { IAssetManagementUseCase } from "../../../domain/usecaseInterface/interface.assetManagementUseCase";

export class AssetManagementUseCase implements IAssetManagementUseCase {
  constructor(private repository: IAssetManagementRepository) {}

  async execute(typeOfAsset: string): Promise<IAssetBase[]> {
    return await this.repository.findAssets(typeOfAsset);
  }

  async fetchAssetById(
    id: string,
    typeOfAsset: string
  ): Promise<IAssetBase | null> {
    return await this.repository.findAssetById(id, typeOfAsset);
  }
}
