import Stripe from "stripe";

export interface IStripePaymentRepository {
  createPaymentIntent(amount: number, currency: string): Promise<Stripe.PaymentIntent>;
  retrievePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent>;
  constructWebhookEvent(payload: Buffer, sig: string): Promise<Stripe.Event>;
}
