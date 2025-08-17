import { Types } from "mongoose";

export interface IPayment {
  method: "card" | "googlepay" | "phonepe" | "paytm";
  status: "pending" | "success" | "failed";
  bookingId: Types.ObjectId;
  transactionId: string;
  platformFee: number;
  total: number;
  paidAt?: Date;
}
