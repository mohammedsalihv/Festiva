import mongoose, { Schema, Types } from "mongoose";
import { IRentCar } from "../entities/serviceInterface/interface.rentCar";

const rentCarSchema = new Schema<IRentCar>(
  {
    businessName: { type: String, required: true },
    carName:{ type: String, required: true },
    rent: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    timeSlots: [{ type: String, required: true }],
    availableDates: [{ type: String, required: true }],
    year: { type: String, required: true },
    plate: { type: String, required: true },
    color: { type: String, required: true },
    fuel: { type: String, required: true },
    transmission: { type: String, required: true },
    seats: { type: String, required: true },
    deposite: { type: String, required: true },
    features: [{ type: String, required: true }],
    inclusion: { type: String, required: true },
    terms: { type: String, required: true },
    carImages: [{ type: String, required: true }],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    typeOfAsset: { type: String, default: "rentcar" },
    location: { type: Schema.Types.ObjectId, ref: "Location", required: true },
    host: { type: Schema.Types.ObjectId, ref: "Host", required: true },
  },
  {
    timestamps: true,
  }
);

export const RentCarModel = mongoose.model<IRentCar>("RentCar", rentCarSchema);
