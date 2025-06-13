import { venueController } from "../../../../Presentation/controllers/host/service/venue.controller";

import { addVenueUseCase } from "../../../../application/use-cases/host/service/venueUseCase";

import { venueRepository } from "../../../repositories/host/service/repository.venueService";
import { LocationRepository } from "../../../repositories/host/service/repository.assetLocation";

const VenueRepository = new venueRepository();
const LocationRepositoryInstance = new LocationRepository();
const addVenue = new addVenueUseCase(VenueRepository);

const VenueController = new venueController(
  addVenue,
  LocationRepositoryInstance
);


export { VenueController };
