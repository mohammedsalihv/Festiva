import { IHostAssetRequestUseCase } from "../../../../domain/usecaseInterface/host/account usecase interfaces/interface.hostRequestsUseCase";
import { IHostAssetRequestRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.hostRequestsRepository";
import { AssetRequestDTO } from "../../../../types/DTO/host/dto.assetRequest";

export class HostAssetRequestUseCase implements IHostAssetRequestUseCase {
  constructor(
    private hostAssetRequestRepository: IHostAssetRequestRepository
  ) {}

  async getAllRequests(): Promise<AssetRequestDTO[]> {
    return await this.hostAssetRequestRepository.getAllRequests();
  }
}
