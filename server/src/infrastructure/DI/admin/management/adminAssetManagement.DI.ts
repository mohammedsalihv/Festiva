import { AdminAssetManagementUseCase } from "../../../../application/use-cases/admin/adminManagement/usecase.adminAssetManagement";
import { AdminAssetManagementRepository } from "../../../repositories/admin/management/repository.adminAssetManagement";
import { AdminAssetsController } from "../../../../Presentation/controllers/admin/adminManagementControllers/adminAsset.controller";
import { adminVenueController } from "../services/adminVenue.DI";
import { adminRentCarController } from "../services/adminRentCar.DI";
import { adminStudioController } from "../services/adminStudio.DI";
import { adminCatersController } from "../services/adminCaters.DI";

const adminAssetManagementRepository = new AdminAssetManagementRepository();
const adminAssetManagementUseCase = new AdminAssetManagementUseCase(
  adminAssetManagementRepository
);
const adminAssetController = new AdminAssetsController(
  adminAssetManagementUseCase,
  adminVenueController,
  adminRentCarController,
  adminStudioController,
  adminCatersController
);

export { adminAssetController };
