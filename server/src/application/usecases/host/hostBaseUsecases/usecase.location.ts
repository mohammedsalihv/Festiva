import { IHostAssetLocationRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.hostAssetLocationRepostory";
import { ILocation } from "../../../../domain/entities/serviceInterface/host/interface.location";
import CustomError from "../../../../utils/common/errors/CustomError";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class addLocationUseCase {
  constructor(private assetLocationRepository: IHostAssetLocationRepository) {}
  async execute(location: ILocation): Promise<ILocation> {
    const locationDetails: ILocation =
      await this.assetLocationRepository.addLocation(location);
    if (!locationDetails) {
      throw new CustomError("Location not added", statusCodes.serverError);
    }
    return locationDetails;
  }
}
