import { HostAssetController } from "../../../../adapters/controllers/host/hostAccountControllers/hostAsset.controller";
import { HostAssetRepository } from "../../../repositories/host/hostAccountRepositories/repository.hostAssets";
import { HostAssetUseCase } from "../../../../application/usecases/host/hostAccountUsecases/usecase.hostAsset";
import { hostVenueController } from "../hostServicesDependencyInjections/hostVenue.DI";
import { hostRentCarController } from "../hostServicesDependencyInjections/hostRentCar.DI";
import { hostCatersController } from "../hostServicesDependencyInjections/hostCaters.DI";
import { hostStudioController } from "../hostServicesDependencyInjections/hostStudio.DI";

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
