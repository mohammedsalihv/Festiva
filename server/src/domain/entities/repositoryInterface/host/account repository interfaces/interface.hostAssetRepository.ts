import {
  AssetRequestDTO,
  myAssetsDTO,
} from "../../../../../types/DTO/host/dto.assetRequest";

export interface IHostAssetRepository {
  myAssets(
    hostId: string,
    page: number,
    limit: number,
    type?: "studio" | "venue" | "rentcar" | "caters",
    search?: string,
    status?: string | string[],
    sortBy?: "newest" | "oldest"
  ): Promise<{ data: myAssetsDTO[]; totalPages: number }>;

  getAllRequests(
    hostId: string,
    page: number,
    limit: number,
    search?: string,
    status?: string,
    sortBy?: "reqDate" | "actionDate" | "status",
    order?: "asc" | "desc"
  ): Promise<{ data: AssetRequestDTO[]; totalPages: number }>;
}
