import { HostVenueRepository } from "../../../repositories/host/hostServicesRepositories/repository.hostVenue";
import { HostVenueUseCase } from "../../../../application/usecases/host/hostServicesUsecases/usecase.hostVenue";
import { HostVenueController } from "../../../../adapters/controllers/host/hostServiceControllers/hostVenue.controller";
import { LocationRepository } from "../../../repositories/host/hostServicesRepositories/repository.location";
import { LocationUseCase } from "../../../../application/usecases/host/hostBaseUsecases/usecase.location";

const hostVenueRepository = new HostVenueRepository();
const locationRepository = new LocationRepository();
const locationUseCase = new LocationUseCase(locationRepository);
const hostVenueUseCase = new HostVenueUseCase(hostVenueRepository);

const hostVenueController = new HostVenueController(
  hostVenueUseCase,
  locationUseCase
);

export { hostVenueController };
