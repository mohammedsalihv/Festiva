import { IHostAssetRequestUseCase } from "../../../../domain/usecaseInterface/host/account usecase interfaces/interface.hostRequestsUseCase";
import { IHostAssetRequestRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.hostRequestsRepository";
import { AssetRequestDTO } from "../../../../types/DTO/host/dto.assetRequest";

export class HostAssetRequestUseCase implements IHostAssetRequestUseCase {
  constructor(
    private hostAssetRequestRepository: IHostAssetRequestRepository
  ) {}

  async getAllRequests(hostId: string, page: number, limit: number) {
    return await this.hostAssetRequestRepository.getAllRequests(
      hostId,
      page,
      limit
    );
  }
}
