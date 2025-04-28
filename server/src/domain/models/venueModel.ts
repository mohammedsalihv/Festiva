import mongoose, { Schema, Types } from "mongoose";
import { IVenue } from "../entities/modelInterface/venue.interface";

const venueSchema = new Schema<IVenue>(
  {
    venueName: { type: String, required: true },
    rent: { type: Number, required: true },
    capacity: { type: Number },
    shift: { type: String },
    squareFeet: { type: Number },
    timeSlots: [{ type: String }],
    availableDates: [{ type: String }],
    details: { type: String },
    features: [{ type: String, required: true }],
    parkingFeatures: [{ type: String, required: true }],
    venueDescription: { type: String, required: true },
    terms: { type: String, required: true },
    venueImages: [{ type: String, required: true }],
    location: { type: Schema.Types.ObjectId, ref: "Location", required: true },
  },
  {
    timestamps: true,
  }
);

export const VenueModel = mongoose.model<IVenue>("Venue", venueSchema);
