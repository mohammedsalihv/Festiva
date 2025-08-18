import { RazorpayPaymentRepository } from "../../../repositories/base/paymentsRepositories/repository.razorpayPayment";
import { PaymentUseCase } from "../../../../application/usecases/base/paymentUsecases/usecase.payment";
import { PaymentController } from "../../../../adapters/controllers/base/paymentControllers/payment.controller";

const razorpayPaymentRepository = new RazorpayPaymentRepository();
const paymentUsecase = new PaymentUseCase(razorpayPaymentRepository);
const paymentController = new PaymentController(paymentUsecase);

export { paymentController };
