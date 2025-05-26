import { ILocationRepository } from "../../../../domain/entities/repositoryInterface/host/interface.locationRepostory";
import { addLocationDTO } from "../../../../config/DTO/host/dto.location";
import { ILocation } from "../../../../domain/entities/serviceInterface/interface.location";
import ErrorHandler from "../../../../utils/CustomError";

export class addLocationUseCase {
  constructor(private locationRepository: ILocationRepository) {}

  async execute(locationDetails: addLocationDTO): Promise<{
    location: {
      houseNo?: string;
      street?: string;
      district?: string;
      state?: string;
      country?: string;
      zip?: string;
    };
  }> {
    if (!locationDetails.country)
      throw new ErrorHandler("Country is required", 400);
    if (!locationDetails.state)
      throw new ErrorHandler("State is required", 400);
    if (!locationDetails.district)
      throw new ErrorHandler("District is required", 400);
    if (!locationDetails.street)
      throw new ErrorHandler("Street is required", 400);
    if (!locationDetails.zip)
      throw new ErrorHandler("ZIP code is required", 400);

    const newLocation: ILocation = {
      houseNo: locationDetails.houseNo?.trim() || undefined,
      street: locationDetails.street.trim(),
      district: locationDetails.district.trim(),
      state: locationDetails.state.trim(),
      country: locationDetails.country.trim(),
      zip: locationDetails.zip.trim(),
    };

    const addLocation: ILocation = await this.locationRepository.addLocation(
      newLocation
    );

    if (!addLocation) {
      throw new ErrorHandler("Location not added", 400);
    }

    return {
      location: {
        houseNo: addLocation.houseNo,
        street: addLocation.street,
        district: addLocation.district,
        state: addLocation.state,
        country: addLocation.country,
        zip: addLocation.zip,
      },
    };
  }
}
