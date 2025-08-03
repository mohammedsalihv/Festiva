import {
  AssetRequestDTO,
  myAssetsDTO,
} from "../../../../types/DTO/host/dto.assetRequest";

export interface IHostAssetUseCase {
  getAllAssets(
    hostId: string,
    page: number,
    limit: number,
    type?: "studio" | "venue" | "rentcar" | "caters"
  ): Promise<{ data: myAssetsDTO[]; totalPages: number }>;

  getAllRequests(
    hostId: string,
    page: number,
    limit: number
  ): Promise<{ data: AssetRequestDTO[]; totalPages: number }>;
}
