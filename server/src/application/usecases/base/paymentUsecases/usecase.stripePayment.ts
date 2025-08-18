import Stripe from "stripe";
import CustomError from "../../../../utils/common/errors/CustomError";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";
import { IStripePaymentRepository } from "../../../../domain/entities/repositoryInterface/base/interface.stripePaymentRepository";
import { IStripePaymentUseCase } from "../../../../domain/usecaseInterface/base/payment/interface.stripePaymentUsecase";

export class StripePaymentUseCase implements IStripePaymentUseCase {
  constructor(private _stripePaymentRepository: IStripePaymentRepository) {}

 async execute(amount: number, currency: string, paymentMethodType: string = "card"): Promise<Stripe.PaymentIntent> {
    return await this._stripePaymentRepository.createPaymentIntent(amount, currency, paymentMethodType);
  }
}
