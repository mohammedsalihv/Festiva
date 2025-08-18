import { IPaymentUseCase } from "../../../../domain/usecaseInterface/base/payment/interface.paymentUsecase";
import { IPaymentRepository } from "../../../../domain/entities/repositoryInterface/base/interface.paymentGateways";

export class PaymentUseCase implements IPaymentUseCase {
  constructor(private _paymentRepository: IPaymentRepository) {}

  async execute(amount: number, currency: string) {
    return await this._paymentRepository.createPayment(amount, currency);
  }
}

