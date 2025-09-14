import mongoose, { Schema, Document } from "mongoose";
import { IPayment } from "../../../databaseModelInterfaces/baseModelInterfaces/interface.payment";

export interface IPaymentDoc extends IPayment, Document {}

const PaymentSchema = new Schema<IPaymentDoc>(
  {
    payerId: { type: Schema.Types.ObjectId, required: true },
    assetId: { type: Schema.Types.ObjectId, required: true },
    bookingId: { type: Schema.Types.ObjectId},
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    transactionId: { type: String },
    platformFee: { type: Number },
    total: { type: Number, required: true },
    paymentDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IPaymentDoc>("Payment", PaymentSchema);
