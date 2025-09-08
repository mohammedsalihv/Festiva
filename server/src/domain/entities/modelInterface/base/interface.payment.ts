import { Types } from "mongoose";

export interface IPayment {
  payerId: Types.ObjectId;
  assetId: Types.ObjectId;
  bookingId?: Types.ObjectId;
  status: string;
  transactionId: string;
  platformFee: number;
  total: number;
  paymentDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
