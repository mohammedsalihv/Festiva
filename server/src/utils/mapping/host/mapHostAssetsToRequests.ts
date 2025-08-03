import { AssetRequestDTO } from "../../../types/DTO/host/dto.assetRequest";
import { mapAssetRequestWithAssetDetailsFromDirectAsset } from "./mapAssetRequest";

export function mapAssetsToRequestDTOs(
  assetType: "studio" | "venue" | "rentcar" | "caters",
  assets: any[]
): AssetRequestDTO[] {
  return assets.map((asset) =>
    mapAssetRequestWithAssetDetailsFromDirectAsset(assetType, asset)
  );
}
    