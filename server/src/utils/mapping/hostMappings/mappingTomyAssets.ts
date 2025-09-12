import { myAssetsDTO } from "../../../types/DTO's/hostDTO's/hostAccountDTO's/dto.assetRequest";

export function mapAssetsToMyAssetsDTOs(
  assetType: "studio" | "venue" | "rentcar" | "caters",
  assets: any[]
): myAssetsDTO[] {
  return assets.map((asset) => ({
    assetId: asset._id.toString(),
    assetName:
      asset?.businessName ||
      asset?.studioName ||
      asset?.venueName ||
      asset?.catersName ||
      "Unnamed",
    assetType,
    assetImage: asset.Images?.[0] || "",
    listedDate: asset.createdAt?.toISOString?.() || new Date(),
    status: asset.status || "Pending",
  }));
}
