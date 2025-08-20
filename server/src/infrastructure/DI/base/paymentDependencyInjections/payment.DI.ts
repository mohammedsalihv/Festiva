import { RazorpayPaymentRepository } from "../../../repositories/base/paymentsRepositories/repository.razorpayPayment";
import { PaymentRepository } from "../../../repositories/base/paymentsRepositories/repository.payment";
import { PaymentUseCase } from "../../../../application/usecases/base/paymentUsecases/usecase.payment";
import { PaymentController } from "../../../../adapters/controllers/base/paymentControllers/payment.controller";

const razorpayPaymentRepository = new RazorpayPaymentRepository();
const paymentRepository = new PaymentRepository()
const paymentUsecase = new PaymentUseCase(razorpayPaymentRepository,paymentRepository);
const paymentController = new PaymentController(paymentUsecase);

export { paymentController };
