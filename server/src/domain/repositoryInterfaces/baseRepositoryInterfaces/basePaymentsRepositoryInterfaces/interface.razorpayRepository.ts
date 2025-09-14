import { PaymentRequestDTO } from "../../../../types/DTO's/baseDTO's/payment";
import { IPaymentDoc } from "../../../entities/databaseModels/baseModels/basePaymentModels/paymentModel";

export interface IRazorpayRepository {
  createPayment(data:PaymentRequestDTO): Promise<IPaymentDoc>;
  retrievePayment(id: string): Promise<{ id: string; status: string }>;
}
