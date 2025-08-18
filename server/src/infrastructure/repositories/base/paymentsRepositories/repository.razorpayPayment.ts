import { IPaymentGatewayRepository } from "../../../../domain/entities/repositoryInterface/base/interface.paymentGateways";
import razorpay from "razorpay"


export class RazorpayPaymentRepository implements IPaymentGatewayRepository {

    
  async createPayment(amount: number, currency: string) {
    return this.razorpay.orders.create({ amount: amount * 100, currency });
  }
}
