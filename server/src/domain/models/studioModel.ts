import mongoose, { Schema, Types } from "mongoose";
import { IStudio } from "../entities/serviceInterface/interface.studio";

const studioSchema = new Schema<IStudio>(
  {
    studioName: { type: String },
    packages: [
      {
        packageName: { type: String, required: true },
        payment: { type: String, required: true },
        packageIncludes: [{ type: String, required: true }],
        manPower: { type: String, required: true },
        equipments: [{ type: String, required: true }],
        deliveryTime: { type: String, required: true },
        validity: { type: String, required: true },
      },
    ],
    timeSlots: [{ type: String, required: true }],
    availableDates: [{ type: String, required: true }],
    serviceFeatures: [{ type: String, required: true }],
    terms: { type: String, required: true },
    description: { type: String, required: true },
    about: { type: String, required: true },
    Images: [{ type: String, required: true }],
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
