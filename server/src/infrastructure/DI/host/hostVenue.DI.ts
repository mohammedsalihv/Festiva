import { HostVenueController } from "../../../Presentation/controllers/host/hostServiceControllers/hostVenue.controller";
import { HostaddVenueUseCase } from "../../../application/use-cases/host/hostServices/usecase.venue";
import { HostVenueRepository } from "../../repositories/host/service/repository.hostVenueService";
import { HostAssetLocationRepository } from "../../repositories/host/service/repository.hostAssetLocation";

const hostVenueRepository = new HostVenueRepository();
const hostAssetLocationRepository = new HostAssetLocationRepository();
const addVenue = new HostaddVenueUseCase(hostVenueRepository);

const hostVenueController = new HostVenueController(
  addVenue,
  hostAssetLocationRepository
);

export { hostVenueController };
