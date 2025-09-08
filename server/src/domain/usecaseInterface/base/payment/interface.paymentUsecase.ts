import { IPayment } from "../../../entities/modelInterface/base/interface.payment";
import { PaymentRequestDTO } from "../../../../types/DTO/common/payment";
import { Types } from "mongoose";

export interface IPaymentUseCase {
  execute(paymentRequest: PaymentRequestDTO): Promise<IPayment>;
  paymentStatus(status: string, paymentId: string): Promise<IPayment | null>;
  updateBookingDetails(
    paymentId: Types.ObjectId | string,
    bookingId: Types.ObjectId | string
  ): Promise<void>;
}
