export interface IPaymentRepository {
  createPayment(amount: number, currency: string): Promise<{ id: string; status: string }>;
  retrievePayment(id: string): Promise<{ id: string; status: string }>;
}
