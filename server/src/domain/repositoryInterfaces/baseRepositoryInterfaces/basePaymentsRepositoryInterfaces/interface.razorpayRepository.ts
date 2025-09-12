import { PaymentRequestDTO } from "../../../../types/DTO's/baseDTO's/payment";
import { IPayment } from "../../modelInterface/base/interface.payment";

export interface IRazorpayRepository {
  createPayment(data:PaymentRequestDTO): Promise<IPayment>;
  retrievePayment(id: string): Promise<{ id: string; status: string }>;
}
