import Razorpay from "razorpay";
import { IPaymentRepository } from "../../../../domain/entities/repositoryInterface/base/interface.paymentGateways";
import paymentModel from "../../../../domain/models/base/payment/paymentModel";


export class RazorpayPaymentRepository implements IPaymentRepository {
  private razorpay: Razorpay;

  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_KEY_SECRET as string,
    });
  }

  async createPayment(amount: number, currency: string) {
    const order = await this.razorpay.orders.create({
      amount,
      currency,
    });
    paymentModel
    return { id: order.id, status: order.status };
  }

  async retrievePayment(id: string) {
    const payment = await this.razorpay.payments.fetch(id);
    return { id: payment.id, status: payment.status };
  }
}
