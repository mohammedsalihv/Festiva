import { RazorpayPaymentRepository } from "../../../repositories/base/basePaymentsRepositories/repository.razorpayPayment";
import { PaymentRepository } from "../../../repositories/base/basePaymentsRepositories/repository.payment";
import { PaymentUseCase } from "../../../../application/usecases/base/basePaymentUsecases/usecase.payment";
import { PaymentController } from "../../../../adapters/controllers/base/basePaymentControllers/payment.controller";


const razorpayPaymentRepository = new RazorpayPaymentRepository();
const paymentRepository = new PaymentRepository()
const paymentUsecase = new PaymentUseCase(razorpayPaymentRepository,paymentRepository);
const paymentController = new PaymentController(paymentUsecase);

export { paymentController };