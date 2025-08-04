import { HostVenueRepository } from "../../../repositories/host/hostServiceRepositories/repository.hostVenue";
import { HostVenueUseCase } from "../../../../application/usecases/host/hostServicesUsecases/usecase.hostVenue";
import { HostVenueController } from "../../../../adapters/controllers/host/hostServiceControllers/hostVenue.controller";
import { HostAssetLocationRepository } from "../../../repositories/host/hostServiceRepositories/repository.hostAssetLocation";

const hostVenueRepository = new HostVenueRepository();
const hostAssetLocationRepository = new HostAssetLocationRepository();
const hostVenueUseCase = new HostVenueUseCase(hostVenueRepository);

const hostVenueController = new HostVenueController(
  hostVenueUseCase,
  hostAssetLocationRepository
);

export { hostVenueController };
