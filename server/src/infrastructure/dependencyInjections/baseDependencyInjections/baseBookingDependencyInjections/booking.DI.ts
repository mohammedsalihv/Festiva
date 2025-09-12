import { BookingRepository } from "../../../repositories/base/baseBookingRepositories/repository.booking";
import { BookingController } from "../../../../adapters/controllers/base/baseBookingControllers/booking.controller";
import { BookingUseCase } from "../../../../application/usecases/base/baseBookingUsecase/usecase.booking";
import { HostNotificationUseCase } from "../../../../application/usecases/host/hostAccountUsecases/usecase.hostNotification";
import { HostNotificationRepository } from "../../../repositories/host/hostAccountRepositories/repository.hostNotification";
import { PaymentUseCase } from "../../../../application/usecases/base/basePaymentUsecases/usecase.payment";
import { PaymentRepository } from "../../../repositories/base/basePaymentsRepositories/repository.payment";
import { RazorpayPaymentRepository } from "../../../repositories/base/basePaymentsRepositories/repository.razorpayPayment";

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
