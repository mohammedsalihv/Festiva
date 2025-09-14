import { IAdminAssetManagementRepository } from "../../../../domain/repositoryInterfaces/adminRepositoryInterfaces/adminManagementRepositoryInterfaces/interface.adminAssetManagementRepository";
import { IAdminAssetBaseRepositoryDTO } from "../../../../domain/repositoryInterfaces/baseRepositoryInterfaces/baseServicesRepositoryInterfaces/interface.assetBaseRepository";
import { VenueModel } from "../../../../domain/entities/databaseModels/hostModels/hostServicesModels/venueModel";
import { CatersModel } from "../../../../domain/entities/databaseModels/hostModels/hostServicesModels/catersModel";
import { RentCarModel } from "../../../../domain/entities/databaseModels/hostModels/hostServicesModels/rentCarModel";
import { StudioModel } from "../../../../domain/entities/databaseModels/hostModels/hostServicesModels/studioModel";

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

  async findAssets(typeOfAsset: string): Promise<IAdminAssetBaseRepositoryDTO[]> {
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
  ): Promise<IAdminAssetBaseRepositoryDTO | null> {
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
      { status: assetStatus , rejectedReason: "" , isReapplied:false },
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
    assetStatus: string,
    reason: string
  ): Promise<{ _id: string; hostId: string } | null> {
    const model = this.getModelByType(typeOfAsset);
    const result = await model.findByIdAndUpdate(
      id,
      { status: assetStatus, rejectedReason: reason , isReapplied:false },
      { new: true, projection: { _id: 1, host: 1 } }
    );
    if (!result) return null;

    return {
      _id: result._id.toString(),
      hostId: result.host.toString(),
    };
  }
}
