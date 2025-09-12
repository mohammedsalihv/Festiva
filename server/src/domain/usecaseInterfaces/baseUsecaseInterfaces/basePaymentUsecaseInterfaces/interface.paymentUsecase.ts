import { IPayment } from "../../../entities/databaseModelInterfaces/baseModelInterfaces/interface.payment";
import { PaymentRequestDTO } from "../../../../types/DTO's/baseDTO's/payment";
import { Types } from "mongoose";

export interface IPaymentUseCase {
  execute(paymentRequest: PaymentRequestDTO): Promise<IPayment>;
  paymentStatus(status: string, paymentId: string): Promise<IPayment | null>;
  updateBookingDetails(
    paymentId: Types.ObjectId | string,
    bookingId: Types.ObjectId | string
  ): Promise<void>;
}
