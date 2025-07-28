import { IHostAssetUseCase } from "../../../../domain/usecaseInterface/host/account-usecase-interfaces/interface.hostAssetUseCase";
import { IHostAssetRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.hostAssetRepository";
import {
  AssetRequestDTO,
  myAssetsDTO,
} from "../../../../types/DTO/host/dto.assetRequest";
import CustomError from "../../../../utils/common/errors/CustomError";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";

export class HostAssetUseCase implements IHostAssetUseCase {
  constructor(private hostAssetRepository: IHostAssetRepository) {}

  async getAllAssets(
    hostId: string,
    page: number,
    limit: number,
    type?: "studio" | "venue" | "rentcar" | "caters"
  ): Promise<{ data: myAssetsDTO[]; totalPages: number }> {
    if (!hostId) {
      throw new CustomError(
        statusMessages.uniqueIDMissing,
        statusCodes.forbidden
      );
    }
    return await this.hostAssetRepository.myAssets(hostId, page, limit, type);
  }

  async getAllRequests(hostId: string, page: number, limit: number) {
    return await this.hostAssetRepository.getAllRequests(hostId, page, limit);
  }
}
