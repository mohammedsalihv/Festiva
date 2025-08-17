import { StripePaymentRepository } from "../../../repositories/base/paymentsRepositories/repository.stripePayment";
import { StripePaymentUseCase } from "../../../../application/usecases/base/paymentUsecases/usecase.stripePayment";
import { PaymentController } from "../../../../adapters/controllers/base/paymentControllers/payment.controller";

const stripePaymentRepository = new StripePaymentRepository();
const stripePaymentUsecase = new StripePaymentUseCase(stripePaymentRepository);
const paymentController = new PaymentController(stripePaymentUsecase);

export { paymentController };
