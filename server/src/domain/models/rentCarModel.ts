import mongoose, { Schema, Types } from "mongoose";
import { IRentCar } from "../entities/serviceInterface/interface.rentCar";

const rentCarSchema = new Schema<IRentCar>(
  {
    businessName: { type: String, required: true },
    carName: { type: String, required: true },
    rent: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    timeSlots: [{ type: String, required: true }],
    availableDates: [{ type: String, required: true }],
    color: { type: String, required: true },
    fuel: { type: String, required: true },
    transmission: { type: String, required: true },
    seats: { type: String, required: true },
    deposite: { type: String, required: true },
    carFeatures: [{ type: String, required: true }],
    additionalFeatures: [{ type: String, required: true }],
    termsOfUse: [{ type: String, required: true }],
    about: { type: String, required: true },
    description: { type: String, required: true },
    userDocument: { type: String, required: true },
    guidelines: { type: String, required: true },
    Images: [{ type: String, required: true }],
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
