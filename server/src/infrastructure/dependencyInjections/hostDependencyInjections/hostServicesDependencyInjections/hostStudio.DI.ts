import { HostStudioController } from "../../../../adapters/controllers/host/hostServiceControllers/hostStudio.controller";
import { HostStudioRepository } from "../../../repositories/host/hostServicesRepositories/repository.hostStudio";
import { HostStudioUseCase } from "../../../../application/usecases/host/hostServicesUsecases/usecase.hostStudio";
import { LocationRepository } from "../../../repositories/host/hostServicesRepositories/repository.location";
import { LocationUseCase } from "../../../../application/usecases/host/hostBaseUsecases/usecase.location";

const hostStudioRepository = new HostStudioRepository();
const locationRepository = new LocationRepository();
const locationUseCase = new LocationUseCase(locationRepository);
const hostStudioUseCase = new HostStudioUseCase(hostStudioRepository);
const hostStudioController = new HostStudioController(
  hostStudioUseCase,
  locationUseCase
);

export { hostStudioController };
