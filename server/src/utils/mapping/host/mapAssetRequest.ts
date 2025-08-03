import { AssetRequestDTO } from "../../../types/DTO/host/dto.assetRequest";
export function mapAssetRequestWithAssetDetailsFromDirectAsset(
  assetType: "studio" | "venue" | "rentcar" | "caters",
  asset: any
): AssetRequestDTO {
  return {
    id: asset._id?.toString?.() || "",
    assetId: asset._id?.toString?.() || "",
    assetType,
    name:
      asset?.businessName ||
      asset?.studioName ||
      asset?.venueName ||
      asset?.catersName ||
      "Unnamed",
    image: asset?.Images?.[0] || "",
    reqDate: asset.createdAt?.toISOString?.() || "",
    actionDate: asset.updatedAt?.toISOString?.() || null,
    status: asset.status || "Pending", 
  };
}
