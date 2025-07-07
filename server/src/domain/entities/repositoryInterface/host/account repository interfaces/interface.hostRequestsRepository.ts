import { AssetRequestDTO } from "../../../../../types/DTO/host/dto.assetRequest";

export interface IHostAssetRequestRepository {
  getAllRequests(): Promise<AssetRequestDTO[]>;
}
