import mongoose, { Schema, model } from "mongoose";
import { ILocation } from "../../../entities/serviceInterface/host/interface.location";

const locationSchema = new Schema<ILocation>(
  {
    houseNo: { type: String },
    street: { type: String },
    district: { type: String },
    state: { type: String },
    country: { type: String },
    zip: { type: String },
    coordinates: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

locationSchema.index({ coordinates: "2dsphere" });

export const LocationModel = model<ILocation>("Location", locationSchema);
