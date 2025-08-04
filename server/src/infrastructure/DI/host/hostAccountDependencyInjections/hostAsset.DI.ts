import { HostAssetController } from "../../../../adapters/controllers/host/hostAccountControllers/hostAsset.controller";
import { HostAssetRepository } from "../../../repositories/host/hostAccountRepositories/repository.hostAssets";
import { HostAssetUseCase } from "../../../../application/usecases/host/hostAccountUsecases/usecase.hostAsset";
import { hostVenueController } from "../hostServiceDependencyInjections/hostVenue.DI";
import { hostRentCarController } from "../hostServiceDependencyInjections/hostRentCar.DI";
import { hostCatersController } from "../hostServiceDependencyInjections/hostCaters.DI";
import { hostStudioController } from "../hostServiceDependencyInjections/hostStudio.DI";

const hostAssetRepository = new HostAssetRepository();
const hostAssetUseCase = new HostAssetUseCase(hostAssetRepository);
const hostAssetController = new HostAssetController(
  hostAssetUseCase,
  hostVenueController,
  hostRentCarController,
  hostCatersController,
  hostStudioController
);

export { hostAssetController };
