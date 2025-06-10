import mongoose, { Schema, Types } from "mongoose";
import { IStudio } from "../entities/serviceInterface/interface.studio";

const studioSchema = new Schema<IStudio>(
  {
    studioName: { type: String },
    packages: {
      packageName: { type: String },
      payment: { type: String },
      packageIncludes: [{ type: String }],
      manPower: { type: String },
      equipments: { type: String },
      deliveryTime: { type: String },
      validity: { type: String },
    },
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
    typeOfAsset: { type: String, default: "studio" },
    location: { type: Schema.Types.ObjectId, ref: "Location", required: true },
    host: { type: Schema.Types.ObjectId, ref: "Host", required: true },
  },
  {
    timestamps: true,
  }
);

export const StudioModel = mongoose.model<IStudio>("Studio", studioSchema);
