import { AdminAssetManagementUseCase } from "../../../../application/usecases/admin/adminManagementUsecases/usecase.adminAssetManagement";
import { AdminAssetManagementRepository } from "../../../repositories/admin/adminManagementRepositories/repository.adminAssetManagement";
import { AdminAssetManagementController } from "../../../../adapters/controllers/admin/adminManagementControllers/adminAsset.controller";
import { HostNotificationUseCase } from "../../../../application/usecases/host/hostAccountUsecases/usecase.hostNotification";  
import { HostNotificationRepository } from "../../../repositories/host/hostAccountRepositories/repository.hostNotification";
import { adminVenueController } from "../adminServicesDependencyInjections/adminVenue.DI";
import { adminRentCarController } from "../adminServicesDependencyInjections/adminRentCar.DI";
import { adminStudioController } from "../adminServicesDependencyInjections/adminStudio.DI";
import { adminCatersController } from "../adminServicesDependencyInjections/adminCaters.DI";

const adminAssetManagementRepository = new AdminAssetManagementRepository();
const adminAssetManagementUseCase = new AdminAssetManagementUseCase(
  adminAssetManagementRepository
);

const hostNotificationRepository = new HostNotificationRepository()
const notificationUseCase = new HostNotificationUseCase(hostNotificationRepository);

const adminAssetManagementController = new AdminAssetManagementController(
  adminAssetManagementUseCase,
  notificationUseCase,
  adminVenueController,
  adminRentCarController,
  adminStudioController,
  adminCatersController
);

export { adminAssetManagementController };
