import Stripe from "stripe";

export interface IStripePaymentUseCase {
  execute(
    amount: number,
    currency: string,
    paymentMethodType?: string
  ): Promise<Stripe.PaymentIntent>;
}
