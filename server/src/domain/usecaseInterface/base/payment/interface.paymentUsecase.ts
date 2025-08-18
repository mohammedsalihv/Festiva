export interface IPaymentUseCase {
  execute(
    amount: number,
    currency: string
  ): Promise<{ id: string; status: string }>;
}
