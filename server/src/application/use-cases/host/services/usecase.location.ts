import { HostAssetLocationRepository } from "../../../../infrastructure/repositories/host/service/repository.hostAssetLocation";
import { addLocationDTO } from "../../../../types/DTO/host/dto.location";
import { ILocation } from "../../../../domain/entities/serviceInterface/interface.location";
import ErrorHandler from "../../../../utils/common/errors/CustomError";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class addLocationUseCase {
  constructor(private locationRepository: HostAssetLocationRepository) {}

  async execute(location: addLocationDTO): Promise<ILocation> {
    const locationDetails: ILocation =
      await this.locationRepository.addLocation(location);

    if (!locationDetails) {
      throw new ErrorHandler("Location not added", statusCodes.serverError);
    }

    return locationDetails;
  }
}
