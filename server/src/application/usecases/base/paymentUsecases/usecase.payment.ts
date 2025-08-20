import { IPaymentUseCase } from "../../../../domain/usecaseInterface/base/payment/interface.paymentUsecase";
import { IPaymentRepository } from "../../../../domain/entities/repositoryInterface/base/interface.paymentRepository";
import { PaymentRequestDTO } from "../../../../types/DTO/common/payment";


export class PaymentUseCase implements IPaymentUseCase {
  constructor(private _paymentRepository: IPaymentRepository) {}

  async execute(paymentPayload:PaymentRequestDTO) {
    return await this._paymentRepository.createPayment(paymentPayload);
  }
}

