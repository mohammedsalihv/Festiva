import { BookingRepository } from "../../../repositories/base/bookingRepositories/repository.booking";
import { BookingController } from "../../../../adapters/controllers/base/bookingControllers/booking.controller";
import { BookingUseCase } from "../../../../application/usecases/base/bookingUsecase/usecase.booking";
import { HostNotificationUseCase } from "../../../../application/usecases/host/hostAccountUsecases/usecase.hostNotification";
import { HostNotificationRepository } from "../../../repositories/host/hostAccountRepositories/repository.hostNotification";
import { PaymentUseCase } from "../../../../application/usecases/base/paymentUsecases/usecase.payment";
import { PaymentRepository } from "../../../repositories/base/paymentsRepositories/repository.payment";
import { RazorpayPaymentRepository } from "../../../repositories/base/paymentsRepositories/repository.razorpayPayment";

const bookingRepository = new BookingRepository();
const hostNotificationRepositoy = new HostNotificationRepository();
const paymentsRepository = new PaymentRepository();
const razorpayRepository = new RazorpayPaymentRepository();
const bookingUsecase = new BookingUseCase(bookingRepository);
const paymentUsecase = new PaymentUseCase(
  razorpayRepository,
  paymentsRepository
);
const hostNotificationUseCase = new HostNotificationUseCase(
  hostNotificationRepositoy
);
const bookingController = new BookingController(
  bookingUsecase,
  hostNotificationUseCase,
  paymentUsecase
);

export { bookingController };
