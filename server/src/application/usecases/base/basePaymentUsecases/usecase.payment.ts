import { IPaymentUseCase } from "../../../../domain/usecaseInterfaces/baseUsecaseInterfaces/basePaymentUsecaseInterfaces/interface.paymentUsecase";
import { IRazorpayRepository } from "../../../../domain/repositoryInterfaces/baseRepositoryInterfaces/basePaymentsRepositoryInterfaces/interface.razorpayRepository";
import { PaymentRequestDTO } from "../../../../types/DTO's/baseDTO's/payment";
import { IPaymentRepository } from "../../../../domain/repositoryInterfaces/baseRepositoryInterfaces/basePaymentsRepositoryInterfaces/interface.paymentRepository";
import { IPayment } from "../../../../domain/entities/databaseModelInterfaces/baseModelInterfaces/interface.payment";
import { Types } from "mongoose";

export class PaymentUseCase implements IPaymentUseCase {
  constructor(
    private _razorpayRepository: IRazorpayRepository,
    private _paymentRepository: IPaymentRepository
  ) {}

  async execute(paymentPayload: PaymentRequestDTO) {
    return await this._razorpayRepository.createPayment(paymentPayload);
  }
  async paymentStatus(
    status: string,
    paymentId: string
  ): Promise<IPayment | null> {
    return await this._paymentRepository.paymentStatusChange(status, paymentId);
  }

  async updateBookingDetails(
    paymentId: Types.ObjectId | string,
    bookingId: Types.ObjectId | string
  ): Promise<void> {
    return await this._paymentRepository.bookingUpdate(paymentId, bookingId);
  }
}
