import { AssetRequestDTO } from "../../../../types/DTO/host/dto.assetRequest";

export interface IHostAssetRequestUseCase {
  getAllRequests(
    hostId: string,
    page: number,
    limit: number
  ): Promise<{ data: AssetRequestDTO[]; totalPages: number }>;
}
