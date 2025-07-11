import { IAdminAssetManagementRepository } from "../../../../domain/entities/repositoryInterface/admin/management/interface.adminAssetManagement";
import { IAssetBase } from "../../../../domain/entities/serviceInterface/interface.asset";
import { VenueModel } from "../../../../domain/models/venueModel";
import { RentCarModel } from "../../../../domain/models/rentCarModel";
import { StudioModel } from "../../../../domain/models/studioModel";
import { CatersModel } from "../../../../domain/models/catersModel";

export class AdminAssetManagementRepository
  implements IAdminAssetManagementRepository
{
  private populateOptions = [
    { path: "host", select: "-password" },
    { path: "location" },
  ];

  private getModelByType(type: string): any {
    switch (type) {
      case "venue":
        return VenueModel;
      case "rentcar":
        return RentCarModel;
      case "studio":
        return StudioModel;
      case "caters":
        return CatersModel;
      default:
        throw new Error("Invalid asset type");
    }
  }

  async findAssets(typeOfAsset: string): Promise<IAssetBase[]> {
    const fetchModelData = async (model: any) => {
      return await model.find().populate(this.populateOptions).lean();
    };

    switch (typeOfAsset) {
      case "venue":
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
    const model = this.getModelByType(typeOfAsset);
    return await model.findById(id).populate(this.populateOptions).lean();
  }

  async assetApprove(
    id: string,
    typeOfAsset: string,
    assetStatus: string
  ): Promise<{ _id: string; hostId: string } | null> {
    const model = this.getModelByType(typeOfAsset);
    const result = await model.findByIdAndUpdate(
      id,
      { status: assetStatus },
      { new: true, projection: { _id: 1, host: 1 } }
    );
    if (!result) return null;

    return {
      _id: result._id.toString(),
      hostId: result.host.toString(),
    };
  }

  async assetReject(
    id: string,
    typeOfAsset: string,
    assetStatus: string
  ): Promise<{ _id: string; hostId: string } | null> {
    const model = this.getModelByType(typeOfAsset);
    const result = await model.findByIdAndUpdate(
      id,
      { status: assetStatus },
      { new: true, projection: { _id: 1, host: 1 } }
    );
    if (!result) return null;

    return {
      _id: result._id.toString(),
      hostId: result.host.toString(),
    };
  }
}
