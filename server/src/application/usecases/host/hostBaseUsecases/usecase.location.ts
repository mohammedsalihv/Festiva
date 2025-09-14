import axios from "axios";
import { geocodeAddress } from "../../../../utils/baseUtilities/geocoding/geocodeAddress";
import { ILocationRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostBaseRepositoryInterfaces/interface.locationRepostory";
import { ILocationUseCase } from "../../../../domain/usecaseInterfaces/baseUsecaseInterfaces/baseServicesUsecaseInterfaces/interface.locationUsecase";
import { ILocation } from "../../../../domain/baseInterfaces/baseServicesInterfaces/interface.location";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";
import { statusCodes } from "../../../../utils/baseUtilities/messages/constantResponses";

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
