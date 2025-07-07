import { AssetRequestDTO } from "../../../../../types/DTO/host/dto.assetRequest";

export interface IHostAssetRequestRepository {
  getAllRequests(
    hostId: string,
    page: number,
    limit: number
  ): Promise<{ data: AssetRequestDTO[]; totalPages: number }>;
}
