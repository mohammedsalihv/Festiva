import mongoose, { Schema, Document } from "mongoose";
import { IBooking } from "../../../entities/modelInterface/base/interface.booking";

export interface IBookingDoc extends IBooking, Document {}

const BookingSchema = new Schema<IBookingDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assetId: { type: Schema.Types.ObjectId, required: true },
    assetType: {
      type: String,
      enum: ["venue", "caters", "rentcar", "studio"],
      required: true,
    },
    selectedDates: { type: [String], required: true },
    selectedTimeSlot: { type: String },
    attendeesCount: { type: Number },
    manpowerCout: { type: Number },
    packageName: { type: String },
    total: { type: Number, required: true },
    bookedData: { type: Schema.Types.Mixed, required: true },
    transactionId: { type: String },
    paymentId: { type: Schema.Types.ObjectId, ref: "Payment" },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    bookingRejectedReason: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IBookingDoc>("Booking", BookingSchema);
