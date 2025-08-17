import mongoose, { Schema, Document } from "mongoose";
import { IPayment } from "../../../entities/modelInterface/base/interface.payment";

export interface IPaymentDoc extends IPayment, Document {}

const PaymentSchema = new Schema<IPaymentDoc>(
  {
    bookingId: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
    method: {
      type: String,
      enum: ["card", "googlepay", "phonepe", "paytm"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    transactionId: { type: String },
    platformFee: { type: Number, default: 50 },
    total: { type: Number, required: true },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IPaymentDoc>("Payment", PaymentSchema);
