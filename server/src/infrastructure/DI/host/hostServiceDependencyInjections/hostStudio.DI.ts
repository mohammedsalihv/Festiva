import { HostStudioController } from "../../../../adapters/controllers/host/hostServiceControllers/hostStudio.controller";
import { HostStudioRepository } from "../../../repositories/host/hostServiceRepositories/repository.hostStudio";
import { HostStudioUseCase } from "../../../../application/usecases/host/hostServicesUsecases/usecase.hostStudio";
import { HostAssetLocationRepository } from "../../../repositories/host/hostServiceRepositories/repository.hostAssetLocation";

const hostStudioRepository = new HostStudioRepository();
const hostAssetLocationRepository = new HostAssetLocationRepository();
const hostStudioUseCase = new HostStudioUseCase(hostStudioRepository);
const hostStudioController = new HostStudioController(
  hostStudioUseCase,
  hostAssetLocationRepository
);

export { hostStudioController };
