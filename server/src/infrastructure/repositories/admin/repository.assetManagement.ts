import { IAssetManagementRepository } from "../../../domain/entities/repositoryInterface/admin/interface.assetManagement";
import { IAssetBase } from "../../../domain/entities/serviceInterface/interface.asset";
import { VenueModel } from "../../../domain/models/venueModel";
import { RentCarModel } from "../../../domain/models/rentCarModel";
import { StudioModel } from "../../../domain/models/studioModel";
import { CatersModel } from "../../../domain/models/catersModel";

export class AssetManagementRepository implements IAssetManagementRepository {
  async findAssets(typeOfAsset: string): Promise<IAssetBase[]> {
    const populateOptions = [
      { path: "host", select: "-password" },
      { path: "location" },
    ];

    const fetchModelData = async (model: any) => {
      return await model.find().populate(populateOptions).lean();
    };

    switch (typeOfAsset) {
      case "venues":
        return await fetchModelData(VenueModel);
      case "rentcar":
        return await fetchModelData(RentCarModel);
      case "studio":
        return await fetchModelData(StudioModel);
      case "caters":
        return await fetchModelData(CatersModel);
      case "all":
        const [venues, rentcars, studios, caters] = await Promise.all([
          fetchModelData(VenueModel),
          fetchModelData(RentCarModel),
          fetchModelData(StudioModel),
          fetchModelData(CatersModel),
        ]);
        return [...venues, ...rentcars, ...studios, ...caters];
      default:
        throw new Error("Invalid asset type");
    }
  }

  async findAssetById(
    id: string,
    typeOfAsset: string
  ): Promise<IAssetBase | null> {
    const populateOptions = [
      { path: "host", select: "-password" },
      { path: "location" },
    ];

    const fetchById = async (model: any) => {
      return await model.findById(id).populate(populateOptions).lean();
    };

    switch (typeOfAsset) {
      case "venues":
        return await fetchById(VenueModel);
      case "rentcar":
        return await fetchById(RentCarModel);
      case "studio":
        return await fetchById(StudioModel);
      case "caters":
        return await fetchById(CatersModel);
      default:
        throw new Error("Invalid asset type");
    }
  }
}
