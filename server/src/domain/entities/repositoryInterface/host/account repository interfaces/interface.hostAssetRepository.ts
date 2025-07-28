import {
  AssetRequestDTO,
  myAssetsDTO,
} from "../../../../../types/DTO/host/dto.assetRequest";

export interface IHostAssetRepository {
  myAssets(
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
