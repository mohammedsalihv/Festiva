export interface IPaymentRepository {
  paymentStatusChange(status: string, paymentId: string): Promise<boolean>;
}
