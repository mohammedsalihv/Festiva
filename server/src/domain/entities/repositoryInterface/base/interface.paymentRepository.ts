import { Types } from "mongoose";
import { IPayment } from "../../modelInterface/base/interface.payment";
export interface IPaymentRepository {
  paymentStatusChange(
    status: string,
    paymentId: string
  ): Promise<IPayment | null>;
  paymentDetails(paymentId: string | Types.ObjectId): Promise<IPayment | null>;
  getAllPayments(): Promise<IPayment[]>;
}
