import { IHostAssetRequestRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.hostRequestsRepository";
import { AssetRequestDTO } from "../../../../types/DTO/host/dto.assetRequest";
import { AssetRequestModel } from "../../../../domain/models/AssetRequestModel";
import { mapAssetRequestWithAssetDetails } from "../../../../utils/host/mapper/mapAssetRequest";
import { RentCarModel } from "../../../../domain/models/rentCarModel";
import { StudioModel } from "../../../../domain/models/studioModel";
import { VenueModel } from "../../../../domain/models/venueModel";
import { CatersModel } from "../../../../domain/models/catersModel";

export class HostAssetRequestRepository implements IHostAssetRequestRepository {
  async getAllRequests(): Promise<AssetRequestDTO[]> {
    const requests = await AssetRequestModel.find()
      .sort({ createdAt: -1 })
      .lean();

    const results: AssetRequestDTO[] = [];

    for (const req of requests) {
      let asset: any = null;

      switch (req.assetType) {
        case "rentcar":
          asset = await RentCarModel.findById(req.assetId).lean();
          break;
        case "studio":
          asset = await StudioModel.findById(req.assetId).lean();
          break;
        case "venue":
          asset = await VenueModel.findById(req.assetId).lean();
          break;
        case "caters":
          asset = await CatersModel.findById(req.assetId).lean();
          break;
        default:
          continue;
      }

      if (!asset) continue;

      results.push(mapAssetRequestWithAssetDetails(req, asset));
    }

    return results;
  }
}
