import { HostNotificationController } from "../../../../Presentation/controllers/host/hostAccountControllers/hostNotification.controller";
import { HostNotificationRepository } from "../../../repositories/host/account/repository.hostNotification";
import { HostNotificationUseCase } from "../../../../application/use-cases/host/host account/usecase.hostNotification";

const hostNotificationRepository = new HostNotificationRepository();
const hostNotificationUseCase = new HostNotificationUseCase(
  hostNotificationRepository
);
const hostNotificationController = new HostNotificationController(
  hostNotificationUseCase
);
export { hostNotificationController };
