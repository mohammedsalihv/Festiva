import { Types } from "mongoose";
import { IPayment } from "../../../entities/databaseModelInterfaces/baseModelInterfaces/interface.payment";
export interface IPaymentRepository {
  paymentStatusChange(
    status: string,
    paymentId: string
  ): Promise<IPayment | null>;
  paymentDetails(paymentId: string | Types.ObjectId): Promise<IPayment | null>;
  getAllPayments(): Promise<IPayment[]>;
  bookingUpdate(
    paymentId: Types.ObjectId | string,
    bookingId: Types.ObjectId | string
  ): Promise<void>;
}
