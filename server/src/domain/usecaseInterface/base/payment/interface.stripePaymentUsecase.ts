import Stripe from "stripe";

export interface IStripePaymentUseCase {
  execute(amount: number, currency: string): Promise<Stripe.PaymentIntent>;
}
