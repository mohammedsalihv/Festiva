import { HostCatersController } from "../../../../Presentation/controllers/host/hostServiceControllers/hostCaters.controller";
import { HostCatersUseCase } from "../../../../application/usecases/host/hostServicesUsecases/usecase.hostCaters";
import { HostCatersRepository } from "../../../repositories/host/hostServiceRepositories/repository.hostCaters";
import { HostAssetLocationRepository } from "../../../repositories/host/hostServiceRepositories/repository.hostAssetLocation";

const hostCatersRepository = new HostCatersRepository();
const hostAssetLocationRepository = new HostAssetLocationRepository();
const hostCatersUseCase = new HostCatersUseCase(hostCatersRepository);
const hostCatersController = new HostCatersController(
  hostCatersUseCase,
  hostAssetLocationRepository
);

export { hostCatersController };
