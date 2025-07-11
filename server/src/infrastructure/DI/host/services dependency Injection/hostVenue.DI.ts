import { HostVenueRepository } from "../../../repositories/host/service/repository.hostVenue";
import { HostVenueUseCase } from "../../../../application/use-cases/host/hostServices/usecase.hostVenue";
import { HostVenueController } from "../../../../Presentation/controllers/host/hostServiceControllers/hostVenue.controller";
import { HostAssetLocationRepository } from "../../../repositories/host/service/repository.hostAssetLocation";

const hostVenueRepository = new HostVenueRepository();
const hostAssetLocationRepository = new HostAssetLocationRepository();
const hostVenueUseCase = new HostVenueUseCase(hostVenueRepository);

const hostVenueController = new HostVenueController(
  hostVenueUseCase,
  hostAssetLocationRepository
);

export { hostVenueController };
