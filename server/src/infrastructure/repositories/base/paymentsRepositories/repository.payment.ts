import paymentModel from "../../../../domain/models/base/payment/paymentModel";
import { IPaymentRepository } from "../../../../domain/entities/repositoryInterface/base/interface.paymentRepository";
import { IPayment } from "../../../../domain/entities/modelInterface/base/interface.payment";

export class PaymentRepository implements IPaymentRepository {
  async paymentStatusChange(status: string, paymentId: string) {
    return await paymentModel.findByIdAndUpdate(
      paymentId,
      { status },
      { new: true }
    );
  }

  async paymentDetails(paymentId: string): Promise<IPayment | null> {
    return await paymentModel.findById(paymentId);
  }
}
