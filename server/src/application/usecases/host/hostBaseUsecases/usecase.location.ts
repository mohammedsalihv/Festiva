import axios from "axios";
import { geocodeAddress } from "../../../../utils/common/geocoding/geocodeAddress";
import { ILocationRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.locationRepostory";
import { ILocationUseCase } from "../../../../domain/usecaseInterface/host/baseUsecaseInterfaces/interface.locationUsecase";
import { ILocation } from "../../../../domain/entities/serviceInterface/host/interface.location";
import CustomError from "../../../../utils/common/errors/CustomError";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class LocationUseCase implements ILocationUseCase {
  constructor(private _locationRepository: ILocationRepository) {}

  async execute(location: ILocation): Promise<ILocation> {
    const fullAddress = `${location.houseNo || ""}, ${location.street || ""}, ${
      location.district || ""
    }, ${location.state || ""}, ${location.country || ""}, ${
      location.zip || ""
    }`;

    const { lat, lng } = await geocodeAddress(fullAddress);

    const enrichedLocation: ILocation = {
      ...location,
      coordinates: {
        type: "Point",
        coordinates: [lng, lat],
      },
    };

    const locationDetails = await this._locationRepository.addLocation(
      enrichedLocation
    );

    if (!locationDetails) {
      throw new CustomError("Location not added", statusCodes.serverError);
    }

    return locationDetails;
  }
}
