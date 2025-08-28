import { BookingRepository } from "../../../repositories/base/bookingRepositories/repository.booking";
import { BookingController } from "../../../../adapters/controllers/base/bookingControllers/booking.controller";
import { BookingUseCase } from "../../../../application/usecases/base/bookingUsecase/usecase.booking";
import { HostNotificationUseCase } from "../../../../application/usecases/host/hostAccountUsecases/usecase.hostNotification";
import { HostNotificationRepository } from "../../../repositories/host/hostAccountRepositories/repository.hostNotification";

const bookingRepository = new BookingRepository();
const hostNotificationRepositoy = new HostNotificationRepository();
const bookingUsecase = new BookingUseCase(bookingRepository);
const hostNotificationUseCase = new HostNotificationUseCase(
  hostNotificationRepositoy
);
const bookingController = new BookingController(
  bookingUsecase,
  hostNotificationUseCase
);

export { bookingController };
