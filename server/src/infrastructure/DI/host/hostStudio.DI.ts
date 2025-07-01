import { HostStudioRepository } from "../../repositories/host/service/repository.hostStudio";
import { HostStudioUseCase } from "../../../application/use-cases/host/hostServices/usecase.hostStudio";
import { HostStudioController } from "../../../Presentation/controllers/host/hostServiceControllers/hostStudio.controller";
import { HostAssetLocationRepository } from "../../repositories/host/service/repository.hostAssetLocation";

const hostStudioRepository = new HostStudioRepository();
const hostAssetLocationRepository = new HostAssetLocationRepository();
const hostStudioUseCase = new HostStudioUseCase(hostStudioRepository);
const hostStudioController = new HostStudioController(
  hostStudioUseCase,
  hostAssetLocationRepository
);

export { hostStudioController };
