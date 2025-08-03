import { IHostAssetRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.hostAssetRepository";
import {
  AssetRequestDTO,
  myAssetsDTO,
} from "../../../../types/DTO/host/dto.assetRequest";
import { mapAssetsToRequestDTOs } from "../../../../utils/mapping/host/mapHostAssetsToRequests";
import { mapAssetsToMyAssetsDTOs } from "../../../../utils/mapping/host/mappingTomyAssets";
import { RentCarModel } from "../../../../domain/models/host/hostServiceModels/rentCarModel";
import { StudioModel } from "../../../../domain/models/host/hostServiceModels/studioModel";
import { VenueModel } from "../../../../domain/models/host/hostServiceModels/venueModel";
import { CatersModel } from "../../../../domain/models/host/hostServiceModels/catersModel";

export class HostAssetRepository implements IHostAssetRepository {
  async myAssets(
    hostId: string,
    page: number,
    limit: number,
    type?: "studio" | "venue" | "rentcar" | "caters"
  ): Promise<{ data: myAssetsDTO[]; totalPages: number }> {
    const allAssets: myAssetsDTO[] = [];

    const fetchMap = {
      rentcar: async () =>
        mapAssetsToMyAssetsDTOs(
          "rentcar",
          await RentCarModel.find({ host: hostId }).lean()
        ),
      studio: async () =>
        mapAssetsToMyAssetsDTOs(
          "studio",
          await StudioModel.find({ host: hostId }).lean()
        ),
      venue: async () =>
        mapAssetsToMyAssetsDTOs(
          "venue",
          await VenueModel.find({ host: hostId }).lean()
        ),
      caters: async () =>
        mapAssetsToMyAssetsDTOs(
          "caters",
          await CatersModel.find({ host: hostId }).lean()
        ),
    };

    if (type) {
      const result = await fetchMap[type]();
      allAssets.push(...result);
    } else {
      const results = await Promise.all([
        fetchMap.rentcar(),
        fetchMap.studio(),
        fetchMap.venue(),
        fetchMap.caters(),
      ]);
      results.forEach((res) => allAssets.push(...res));
    }

    const sorted = allAssets.sort(
      (a, b) =>
        new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime()
    );

    const totalPages = Math.ceil(sorted.length / limit);
    const paginated = sorted.slice((page - 1) * limit, page * limit);

    return { data: paginated, totalPages };
  }

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

    const sorted = allResults.sort(
      (a, b) => new Date(b.reqDate).getTime() - new Date(a.reqDate).getTime()
    );

    const totalItems = sorted.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const paginated = sorted.slice(startIndex, startIndex + limit);

    return { data: paginated, totalPages };
  }
}
