import { AdminAssetManagementUseCase } from "../../../../application/use-cases/admin/adminManagement/usecase.adminAssetManagement";
import { AdminAssetManagementRepository } from "../../../repositories/admin/management/repository.adminAssetManagement";
import { AdminAssetsController } from "../../../../Presentation/controllers/admin/adminManagementControllers/adminAsset.controller";
import { HostNotificationUseCase } from "../../../../application/use-cases/host/hostServices/usecase.hostNotification";
import { NotificationRepository } from "../../../repositories/base repositories/repository.notification";
import { adminVenueController } from "../services/adminVenue.DI";
import { adminRentCarController } from "../services/adminRentCar.DI";
import { adminStudioController } from "../services/adminStudio.DI";
import { adminCatersController } from "../services/adminCaters.DI";

const adminAssetManagementRepository = new AdminAssetManagementRepository();
const adminAssetManagementUseCase = new AdminAssetManagementUseCase(
  adminAssetManagementRepository
);

const notificationRepository = new NotificationRepository();
const notificationUseCase = new HostNotificationUseCase(notificationRepository);

const adminAssetController = new AdminAssetsController(
  adminAssetManagementUseCase,
  notificationUseCase,
  adminVenueController,
  adminRentCarController,
  adminStudioController,
  adminCatersController
);

export { adminAssetController };
