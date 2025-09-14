import paymentModel from "../../../../domain/entities/databaseModels/baseModels/basePaymentModels/paymentModel";
import { IPaymentRepository } from "../../../../domain/repositoryInterfaces/baseRepositoryInterfaces/basePaymentsRepositoryInterfaces/interface.paymentRepository";
import { IPayment } from "../../../../domain/entities/databaseModelInterfaces/baseModelInterfaces/interface.payment";
import { Types } from "mongoose";
import bookingModel from "../../../../domain/entities/databaseModels/baseModels/baseBookingModels/bookingModel";

export class PaymentRepository implements IPaymentRepository {
  async paymentStatusChange(
    status: string,
    paymentId: string
  ): Promise<IPayment | null> {
    return await paymentModel
      .findByIdAndUpdate(paymentId, { status }, { new: true })
      .lean<IPayment>()
      .exec();
  }

  async paymentDetails(paymentId: string): Promise<IPayment | null> {
    return await paymentModel.findById(paymentId).lean<IPayment>().exec();
  }

  async getAllPayments(): Promise<IPayment[]> {
    return await paymentModel.find().lean<IPayment[]>().exec();
  }

  async bookingUpdate(
    paymentId: Types.ObjectId | string,
    bookingId: Types.ObjectId | string
  ): Promise<void> {
    await bookingModel
      .findByIdAndUpdate(bookingId, { $set: { paymentId } }, { new: true })
      .exec();
  }
}
