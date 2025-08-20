import paymentModel from "../../../../domain/models/base/payment/paymentModel";
import { IPaymentRepository } from "../../../../domain/entities/repositoryInterface/base/interface.paymentRepository";

export class PaymentRepository implements IPaymentRepository {
  async paymentStatusChange(status: string, paymentId: string): Promise<void> {
    await paymentModel.findByIdAndUpdate(paymentId, { status }, { new: true });
  }
}
