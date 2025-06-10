import mongoose, { Schema, Types } from "mongoose";
import { ICaters } from "../entities/serviceInterface/interface.caters";

const catersSchema = new Schema<ICaters>(
  {
    catersName: { type: String },
    manpower: { type: String, required: true },
    rent: { type: String, required: true },
    timeSlots: [{ type: String }],
    availableDates: [{ type: String }],
    features: [{ type: String }],
    terms: { type: String },
    conditions: { type: String },
    about: { type: String, required: true },
    workImages: [{ type: String, required: true }],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    typeOfAsset: { type: String, default: "caters" },
    location: { type: Schema.Types.ObjectId, ref: "Location", required: true },
    host: { type: Schema.Types.ObjectId, ref: "Host", required: true },
  },
  {
    timestamps: true,
  }
);

export const CatersModel = mongoose.model<ICaters>("Caters", catersSchema);
