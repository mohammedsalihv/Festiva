import Stripe from "stripe";
import CustomError from "../../../../utils/common/errors/CustomError";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";
import { IStripePaymentRepository } from "../../../../domain/entities/repositoryInterface/base/interface.stripePaymentRepository";
import { IStripePaymentUseCase } from "../../../../domain/usecaseInterface/base/payment/interface.stripePaymentUsecase";

export class StripePaymentUseCase implements IStripePaymentUseCase {
  constructor(private _stripePaymentRepository: IStripePaymentRepository) {}

  async execute(
    amount: number,
    currency: string
  ): Promise<Stripe.PaymentIntent> {
    if (amount <= 0)
      throw new CustomError("Invalid amount", statusCodes.forbidden);
    return this._stripePaymentRepository.createPaymentIntent(amount, currency);
  }
}
