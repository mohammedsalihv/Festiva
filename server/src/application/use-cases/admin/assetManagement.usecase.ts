import { IVenue } from "../../../domain/entities/serviceInterface/interface.venue";
import { IAssetManagementRepository } from "../../../domain/entities/repositoryInterface/admin/interface.assetManagement";
import { IAssetManagementUseCase } from "../../../domain/usecaseInterface/interface.assetManagementUseCase";

export class AssetManagementUseCase implements IAssetManagementUseCase {
  constructor(private assetManagementRepository: IAssetManagementRepository) {}

  async execute(): Promise<IVenue[]> {
    const assets = await this.assetManagementRepository.findAllAssets();
    if (assets.length === 0) {
      throw new Error("Assets empty");
    }
    return assets;
  }
}
