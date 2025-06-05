import { IVenue } from "../../../domain/entities/serviceInterface/interface.venue";
import { VenueModel } from "../../../domain/models/venueModel";
import { IAssetManagementRepository } from "../../../domain/entities/repositoryInterface/admin/interface.assetManagement";

export class AssetManagementRepository implements IAssetManagementRepository {
  async findAllAssets(): Promise<IVenue[]> {
    const response = await VenueModel.find().exec();

    return response;
  }
}
