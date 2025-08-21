import { IPayment } from "../../../entities/modelInterface/base/interface.payment";
import { PaymentRequestDTO } from "../../../../types/DTO/common/payment";

export interface IPaymentUseCase {
  execute(paymentRequest: PaymentRequestDTO): Promise<IPayment>;
  paymentStatus(status: string, paymentId: string): Promise<IPayment | null>;
}
