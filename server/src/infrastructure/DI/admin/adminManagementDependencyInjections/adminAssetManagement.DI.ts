import { AdminAssetManagementUseCase } from "../../../../application/usecases/admin/adminManagementUsecases/usecase.adminAssetManagement";
import { AdminAssetManagementRepository } from "../../../repositories/admin/adminManagementRepositories/repository.adminAssetManagement";
import { AdminAssetsController } from "../../../../adapters/controllers/admin/adminManagementControllers/adminAsset.controller";
import { HostNotificationUseCase } from "../../../../application/usecases/host/hostAccountUsecases/usecase.hostNotification";
import { NotificationRepository } from "../../../repositories/base/account/repository.notification";
import { HostNotificationRepository } from "../../../repositories/host/hostAccountRepositories/repository.hostNotification";
import { adminVenueController } from "../adminServiceDependencyInjections/adminVenue.DI";
import { adminRentCarController } from "../adminServiceDependencyInjections/adminRentCar.DI";
import { adminStudioController } from "../adminServiceDependencyInjections/adminStudio.DI";
import { adminCatersController } from "../adminServiceDependencyInjections/adminCaters.DI";

const adminAssetManagementRepository = new AdminAssetManagementRepository();
const adminAssetManagementUseCase = new AdminAssetManagementUseCase(
  adminAssetManagementRepository
);

const notificationRepository = new NotificationRepository();
const hostNotificationRepository = new HostNotificationRepository()
const notificationUseCase = new HostNotificationUseCase(hostNotificationRepository);

const adminAssetController = new AdminAssetsController(
  adminAssetManagementUseCase,
  notificationUseCase,
  adminVenueController,
  adminRentCarController,
  adminStudioController,
  adminCatersController
);

export { adminAssetController };
