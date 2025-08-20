import { PaymentRequestDTO } from "../../../../types/DTO/common/payment";
import { IPayment } from "../../../entities/modelInterface/base/interface.payment";

export interface IPaymentUseCase {
  execute(PaymentRequest:PaymentRequestDTO): Promise<IPayment>;
  paymentStatus(status:string,paymentId:string):Promise<void>;
}
