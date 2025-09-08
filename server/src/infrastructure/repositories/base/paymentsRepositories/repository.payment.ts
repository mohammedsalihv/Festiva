import paymentModel from "../../../../domain/models/base/payment/paymentModel";
import { IPaymentRepository } from "../../../../domain/entities/repositoryInterface/base/interface.paymentRepository";
import { IPayment } from "../../../../domain/entities/modelInterface/base/interface.payment";
import { Types } from "mongoose";
import bookingModel from "../../../../domain/models/base/booking/bookingModel";

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

  async getAllPayments(): Promise<IPayment[]> {
    return await paymentModel.find().lean();
  }

  async bookingUpdate(
    paymentId: Types.ObjectId | string,
    bookingId: Types.ObjectId | string
  ): Promise<void> {
    await bookingModel.findByIdAndUpdate(
      paymentId,
      { $set: { bookingId: bookingId } },
      { new: true }
    );
  }
}
