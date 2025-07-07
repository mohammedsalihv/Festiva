import { AssetRequestDTO } from "../../../../types/DTO/host/dto.assetRequest";

export interface IHostAssetRequestUseCase {
  getAllRequests(): Promise<AssetRequestDTO[]>;
}
