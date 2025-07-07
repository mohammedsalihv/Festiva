import { IHostAssetRequestRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.hostRequestsRepository";
import { AssetRequestDTO } from "../../../../types/DTO/host/dto.assetRequest";
import { mapAssetsToRequestDTOs } from "../../../../utils/host/mapper/mapHostAssetsToRequests";
import { RentCarModel } from "../../../../domain/models/rentCarModel";
import { StudioModel } from "../../../../domain/models/studioModel";
import { VenueModel } from "../../../../domain/models/venueModel";
import { CatersModel } from "../../../../domain/models/catersModel";

// repositories/HostAssetRequestRepository.ts
export class HostAssetRequestRepository implements IHostAssetRequestRepository {
  async getAllRequests(
    hostId: string,
    page: number,
    limit: number
  ): Promise<{ data: AssetRequestDTO[]; totalPages: number }> {
    const [rentCars, studios, venues, caters] = await Promise.all([
      RentCarModel.find({ host: hostId }).lean(),
      StudioModel.find({ host: hostId }).lean(),
      VenueModel.find({ host: hostId }).lean(),
      CatersModel.find({ host: hostId }).lean(),
    ]);

    const allResults: AssetRequestDTO[] = [
      ...mapAssetsToRequestDTOs("rentcar", rentCars),
      ...mapAssetsToRequestDTOs("studio", studios),
      ...mapAssetsToRequestDTOs("venue", venues),
      ...mapAssetsToRequestDTOs("caters", caters),
    ];

    // Sort by request date descending
    const sorted = allResults.sort(
      (a, b) => new Date(b.reqDate).getTime() - new Date(a.reqDate).getTime()
    );

    // Pagination
    const totalItems = sorted.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const paginated = sorted.slice(startIndex, startIndex + limit);

    return { data: paginated, totalPages };
  }
}
