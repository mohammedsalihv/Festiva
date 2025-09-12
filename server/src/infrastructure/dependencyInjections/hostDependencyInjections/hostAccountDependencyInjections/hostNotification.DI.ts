import { HostNotificationController } from "../../../../adapters/controllers/host/hostAccountControllers/hostNotification.controller";
import { HostNotificationRepository } from "../../../repositories/host/hostAccountRepositories/repository.hostNotification";
import { HostNotificationUseCase } from "../../../../application/usecases/host/hostAccountUsecases/usecase.hostNotification";

const hostNotificationRepository = new HostNotificationRepository();
const hostNotificationUseCase = new HostNotificationUseCase(
  hostNotificationRepository
);
const hostNotificationController = new HostNotificationController(
  hostNotificationUseCase
);
export { hostNotificationController };
