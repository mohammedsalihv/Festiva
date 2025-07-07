import { AssetRequestDTO } from "../../../types/DTO/host/dto.assetRequest";
import { IAssetRequest } from "../../../domain/entities/serviceInterface/interface.assetRequest";

export function mapAssetRequestWithAssetDetails(
  req: IAssetRequest & { _id: any; createdAt?: Date; updatedAt?: Date },
  asset: any // The actual asset document (Studio, RentCar, etc.)
): AssetRequestDTO {
  return {
    id: req._id?.toString?.() || "",
    assetId: req.assetId?.toString?.() || "",
    assetType: req.assetType,
    name:
      asset?.carName ||
      asset?.studioName ||
      asset?.venueName ||
      asset?.catersName ||
      "Unnamed",
    image: asset?.Images?.[0] || "",
    reqDate: req.createdAt?.toISOString?.() || "",
    actionDate: req.updatedAt?.toISOString?.() || null,
    status: req.status,
  };
}
