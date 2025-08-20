export interface paymentPayload {
  payerId: string;
  assetId: string;
  amount:number;
  platformFee: number;
  currency: string;
}
