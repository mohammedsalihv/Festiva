import { IHostAssetRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.hostAssetRepository";
import {
  AssetRequestDTO,
  myAssetsDTO,
} from "../../../../types/DTO's/hostDTO's/hostAccountDTO's/dto.assetRequest";
import { mapAssetsToRequestDTOs } from "../../../../utils/mapping/hostMappings/mapHostAssetsToRequests";
import { mapAssetsToMyAssetsDTOs } from "../../../../utils/mapping/hostMappings/mappingTomyAssets";
import { RentCarModel } from "../../../../domain/models/host/hostServiceModels/rentCarModel";
import { StudioModel } from "../../../../domain/models/host/hostServiceModels/studioModel";
import { VenueModel } from "../../../../domain/models/host/hostServiceModels/venueModel";
import { CatersModel } from "../../../../domain/models/host/hostServiceModels/catersModel";

export class HostAssetRepository implements IHostAssetRepository {
  async myAssets(
    hostId: string,
    page: number,
    limit: number,
    type?: "studio" | "venue" | "rentcar" | "caters",
    search?: string,
    status?: string | string[],
    sortBy?: "newest" | "oldest"
  ): Promise<{ data: myAssetsDTO[]; totalPages: number }> {
    const allAssets: myAssetsDTO[] = [];

    const buildFilter = (type?: string): Record<string, any> => {
      const filter: Record<string, any> = { host: hostId };

      if (status) {
        filter.status = Array.isArray(status) ? { $in: status } : status;
      }

      if (search) {
        const escapeRegExp = (s: string) =>
          s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = { $regex: `^${escapeRegExp(search)}`, $options: "i" };

        const fieldMap: Record<string, string[]> = {
          venue: ["venueName"],
          studio: ["studioName"],
          caters: ["businessName"],
          rentcar: ["carName", "businessName"],
        };

        const fields = type ? fieldMap[type] : [];

        if (fields.length === 1) {
          filter[fields[0]] = regex;
        } else if (fields.length > 1) {
          filter.$or = fields.map((field) => ({ [field]: regex }));
        }
      }

      return filter;
    };

    const fetchMap = {
      rentcar: async () =>
        mapAssetsToMyAssetsDTOs(
          "rentcar",
          await RentCarModel.find(buildFilter("rentcar")).lean()
        ),
      studio: async () =>
        mapAssetsToMyAssetsDTOs(
          "studio",
          await StudioModel.find(buildFilter("studio")).lean()
        ),
      venue: async () =>
        mapAssetsToMyAssetsDTOs(
          "venue",
          await VenueModel.find(buildFilter("venue")).lean()
        ),
      caters: async () =>
        mapAssetsToMyAssetsDTOs(
          "caters",
          await CatersModel.find(buildFilter("caters")).lean()
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

    // Sort logic
    const sorted = allAssets.sort((a, b) => {
      const timeA = new Date(a.listedDate).getTime();
      const timeB = new Date(b.listedDate).getTime();
      return sortBy === "oldest" ? timeA - timeB : timeB - timeA;
    });

    const totalPages = Math.ceil(sorted.length / limit);
    const paginated = sorted.slice((page - 1) * limit, page * limit);

    return { data: paginated, totalPages };
  }

  async getAllRequests(
    hostId: string,
    page: number,
    limit: number,
    search = "",
    status = "",
    sortBy = "",
    order: "asc" | "desc" = "desc",
    assetType = ""
  ): Promise<{ data: AssetRequestDTO[]; totalPages: number }> {
    const [rentCars, studios, venues, caters] = await Promise.all([
      RentCarModel.find({ host: hostId }).lean(),
      StudioModel.find({ host: hostId }).lean(),
      VenueModel.find({ host: hostId }).lean(),
      CatersModel.find({ host: hostId }).lean(),
    ]);

    let allResults: AssetRequestDTO[] = [];

    if (!assetType || assetType === "") {
      allResults = [
        ...mapAssetsToRequestDTOs("rentcar", rentCars),
        ...mapAssetsToRequestDTOs("studio", studios),
        ...mapAssetsToRequestDTOs("venue", venues),
        ...mapAssetsToRequestDTOs("caters", caters),
      ];
    } else {
      const map: Record<string, AssetRequestDTO[]> = {
        rentcar: mapAssetsToRequestDTOs("rentcar", rentCars),
        studio: mapAssetsToRequestDTOs("studio", studios),
        venue: mapAssetsToRequestDTOs("venue", venues),
        caters: mapAssetsToRequestDTOs("caters", caters),
      };

      allResults = map[assetType] || []; 
    }

    let filtered = allResults;
    if (search.trim()) {
      const searchRegex = new RegExp(search, "i");
      filtered = filtered.filter((item) => searchRegex.test(item.name));
    }

    if (status) {
      filtered = filtered.filter((item) => item.status === status);
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        const aValue = a[sortBy as keyof typeof a];
        const bValue = b[sortBy as keyof typeof b];

        if (aValue && bValue) {
          const result =
            new Date(aValue).getTime() - new Date(bValue).getTime();
          return order === "asc" ? result : -result;
        }
        return 0;
      });
    } else {
      filtered.sort(
        (a, b) => new Date(b.reqDate).getTime() - new Date(a.reqDate).getTime()
      );
    }

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return { data: paginated, totalPages };
  }
}
