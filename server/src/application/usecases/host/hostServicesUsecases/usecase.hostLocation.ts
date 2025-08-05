import { IHostAssetLocationRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.locationRepostory";
import { addLocationDTO } from "../../../../types/DTO/host/dto.location";
import { ILocation } from "../../../../domain/entities/serviceInterface/host/interface.location";
import ErrorHandler from "../../../../utils/common/errors/CustomError";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class HostaddLocationUseCase {
  constructor(
    private hostAssetlocationRepository: IHostAssetLocationRepository
  ) {}

  async execute(location: addLocationDTO): Promise<ILocation> {
    const locationDetails: ILocation =
      await this.hostAssetlocationRepository.addLocation(location);

    if (!locationDetails) {
      throw new ErrorHandler("Location not added", statusCodes.serverError);
    }

    return locationDetails;
  }
}
