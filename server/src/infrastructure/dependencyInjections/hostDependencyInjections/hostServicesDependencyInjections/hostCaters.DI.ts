import { HostCatersController } from "../../../../adapters/controllers/host/hostServiceControllers/hostCaters.controller";
import { HostCatersUseCase } from "../../../../application/usecases/host/hostServicesUsecases/usecase.hostCaters";
import { HostCatersRepository } from "../../../repositories/host/hostServicesRepositories/repository.hostCaters";
import { LocationRepository } from "../../../repositories/host/hostServicesRepositories/repository.location";

const hostCatersRepository = new HostCatersRepository();
const locationRepository = new LocationRepository();
const hostCatersUseCase = new HostCatersUseCase(hostCatersRepository);
const hostCatersController = new HostCatersController(
  hostCatersUseCase,
  locationRepository
);

export { hostCatersController };
