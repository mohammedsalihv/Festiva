import { Types } from "mongoose";

export interface IPayment {
  payerId: Types.ObjectId;
  assetId: Types.ObjectId;
  status: string;
  transactionId: string;
  platformFee: number;
  total: number;
  paymentDate:Date;
}
