import { IAdminAssetBaseUseCase } from "../../../../domain/usecaseInterfaces/adminUsecaseInterfaces/adminBaseUsecaseInterfaces/interface.adminAssetBaseUsecase";
import { IAdminAssetManagementRepository } from "../../../../domain/repositoryInterfaces/adminRepositoryInterfaces/adminManagementRepositoryInterfaces/interface.adminAssetManagementRepository";
import { IAdminAssetManagementUseCase } from "../../../../domain/usecaseInterfaces/adminUsecaseInterfaces/adminManagementUsecaseInterfaces/interface.adminAssetManagementUseCase";

export class AdminAssetManagementUseCase
  implements IAdminAssetManagementUseCase
{
  constructor(
    private _adminAssetManagementRepository: IAdminAssetManagementRepository
  ) {}

  async execute(typeOfAsset: string): Promise<IAdminAssetBaseUseCase[]> {
    return await this._adminAssetManagementRepository.findAssets(typeOfAsset);
  }

  async fetchAssetById(
    id: string,
    typeOfAsset: string
  ): Promise<IAdminAssetBaseUseCase | null> {
    return await this._adminAssetManagementRepository.findAssetById(
      id,
      typeOfAsset
    );
  }

  async assetApprove(
    id: string,
    typeOfAsset: string,
    assetStatus: string
  ): Promise<{ _id: string; hostId: string } | null> {
    return await this._adminAssetManagementRepository.assetApprove(
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
    return await this._adminAssetManagementRepository.assetReject(
      id,
      typeOfAsset,
      assetStatus,
      reason
    );
  }
}
