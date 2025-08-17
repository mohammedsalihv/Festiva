import Stripe from "stripe";
import { IStripePaymentRepository } from "../../../../domain/entities/repositoryInterface/base/interface.stripePaymentRepository";

export class StripePaymentRepository implements IStripePaymentRepository {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2025-07-30.basil",
    });
  }

  async createPaymentIntent(
    amount: number,
    currency: string
  ): Promise<Stripe.PaymentIntent> {
    return await this.stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });
  }

  async retrievePaymentIntent(
    paymentIntentId: string
  ): Promise<Stripe.PaymentIntent> {
    return await this.stripe.paymentIntents.retrieve(paymentIntentId);
  }

  async constructWebhookEvent(
    payload: Buffer,
    sig: string
  ): Promise<Stripe.Event> {
    return this.stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  }
}
