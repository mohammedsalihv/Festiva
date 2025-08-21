import { IPayment } from "../../modelInterface/base/interface.payment";
export interface IPaymentRepository {
  paymentStatusChange(status: string, paymentId: string): Promise<IPayment | null>;
}
