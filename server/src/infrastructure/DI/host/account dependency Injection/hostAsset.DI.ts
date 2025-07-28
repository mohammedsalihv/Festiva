import { HostAssetController } from "../../../../Presentation/controllers/host/hostAccountControllers/hostAsset.controller";
import { HostAssetRepository } from "../../../repositories/host/account/repository.hostAssets";
import { HostAssetUseCase } from "../../../../application/use-cases/host/host account/usecase.hostAsset";
import { hostVenueController } from "../services dependency Injection/hostVenue.DI";
import { hostRentCarController } from "../services dependency Injection/hostRentCar.DI";
import { hostCatersController } from "../services dependency Injection/hostCaters.DI";
import { hostStudioController } from "../services dependency Injection/hostStudio.DI";

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
