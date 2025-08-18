export interface IPaymentGatewayRepository {
  createPayment(amount: number, currency: string): Promise<any>;
}
