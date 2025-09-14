import Razorpay from "razorpay";
import { PaymentRequestDTO } from "../../../../types/DTO's/baseDTO's/payment";
import { IRazorpayRepository } from "../../../../domain/repositoryInterfaces/baseRepositoryInterfaces/basePaymentsRepositoryInterfaces/interface.razorpayRepository";
import paymentModel, { IPaymentDoc } from "../../../../domain/entities/databaseModels/baseModels/basePaymentModels/paymentModel";
import { IPayment } from "../../../../domain/entities/databaseModelInterfaces/baseModelInterfaces/interface.payment";

export class RazorpayPaymentRepository implements IRazorpayRepository {
  private razorpay: Razorpay;

  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_KEY_SECRET as string,
    });
  }

  async createPayment(data: PaymentRequestDTO): Promise<IPaymentDoc> {
  const order = await this.razorpay.orders.create({
    amount: data.amount * 100,
    currency: data.currency,
    receipt: `receipt_${Date.now()}`,
  });

  const payment = new paymentModel({
    payerId: data.payerId,
    assetId: data.assetId,
    transactionId: order.id,
    platformFee: data.platformFee,
    total: data.amount,
    paymentDate: new Date(),
  });

  return await payment.save();
}


  async retrievePayment(id: string): Promise<{ id: string; status: string }> {
    const payment = await this.razorpay.payments.fetch(id);
    return { id: payment.id, status: payment.status };
  }
}
