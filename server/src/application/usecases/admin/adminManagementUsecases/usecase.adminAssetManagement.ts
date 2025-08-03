import { IAdminAssetBaseUseCase } from "../../../../domain/entities/serviceInterface/admin/usecase/interface.adminAssetBaseUsecase";
import { IAdminAssetManagementRepository } from "../../../../domain/entities/repositoryInterface/admin/management/interface.adminAssetManagementRepository";
import { IAdminAssetManagementUseCase } from "../../../../domain/usecaseInterface/admin/managementUsecaseInterfaces/interface.adminAssetManagementUseCase";

export class AdminAssetManagementUseCase
  implements IAdminAssetManagementUseCase
{
  constructor(
    private adminAssetManagementRepository: IAdminAssetManagementRepository
  ) {}

  async execute(typeOfAsset: string): Promise<IAdminAssetBaseUseCase[]> {
    return await this.adminAssetManagementRepository.findAssets(typeOfAsset);
  }

  async fetchAssetById(
    id: string,
    typeOfAsset: string
  ): Promise<IAdminAssetBaseUseCase | null> {
    return await this.adminAssetManagementRepository.findAssetById(
      id,
      typeOfAsset
    );
  }

  async assetApprove(
    id: string,
    typeOfAsset: string,
    assetStatus: string
  ): Promise<{ _id: string; hostId: string } | null> {
    return await this.adminAssetManagementRepository.assetApprove(
      id,
      typeOfAsset,
      assetStatus
    );
  }

  async assetReject(
    id: string,
    typeOfAsset: string,
    assetStatus: string,
    reason: string
  ): Promise<{ _id: string; hostId: string } | null> {
    return await this.adminAssetManagementRepository.assetReject(
      id,
      typeOfAsset,
      assetStatus,
      reason
    );
  }
}
