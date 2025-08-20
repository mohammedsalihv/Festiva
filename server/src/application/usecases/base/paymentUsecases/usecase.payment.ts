import { IPaymentUseCase } from "../../../../domain/usecaseInterface/base/payment/interface.paymentUsecase";
import { IRazorpayRepository } from "../../../../domain/entities/repositoryInterface/base/interface.razorpayRepository";
import { PaymentRequestDTO } from "../../../../types/DTO/common/payment";
import { IPaymentRepository } from "../../../../domain/entities/repositoryInterface/base/interface.paymentRepository";

export class PaymentUseCase implements IPaymentUseCase {
  constructor(
    private _razorpayRepository: IRazorpayRepository,
    private _paymentRepository: IPaymentRepository
  ) {}

  async execute(paymentPayload: PaymentRequestDTO) {
    return await this._razorpayRepository.createPayment(paymentPayload);
  }
  async paymentStatus(status: string, paymentId: string): Promise<void> {
    return await this._paymentRepository.paymentStatusChange(status, paymentId);
  }
}
