import { AdminAssetManagementUseCase } from "../../../application/use-cases/admin/adminManagement/usecase.adminAssetManagement";
import { AdminAssetManagementRepository } from "../../repositories/admin/adminServiceRepositories/repository.adminAssetManagement";
import { AdminAssetsController } from "../../../Presentation/controllers/admin/adminManagementControllers/adminAsset.controller";
import { adminVenueController } from "./adminVenue.DI";

const adminAssetManagementRepository = new AdminAssetManagementRepository();
const adminAssetManagementUseCase = new AdminAssetManagementUseCase(
  adminAssetManagementRepository
);
const adminAssetController = new AdminAssetsController(
  adminAssetManagementUseCase,
  adminVenueController
);

export { adminAssetController };
