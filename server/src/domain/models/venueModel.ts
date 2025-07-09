import mongoose, { Schema, Types } from "mongoose";
import { IVenue } from "../entities/serviceInterface/interface.venue";

const venueSchema = new Schema<IVenue>(
  {
    venueName: { type: String, required: true },
    rent: { type: String, required: true },
    capacity: { type: String },
    shift: { type: String },
    squareFeet: { type: String },
    timeSlots: [{ type: String }],
    availableDates: [{ type: String }],
    about: { type: String },
    features: [{ type: String, required: true }],
    parkingFeatures: [{ type: String, required: true }],
    description: { type: String},
    terms: { type: String, required: true },
    Images: [{ type: String, required: true }],
    status:{ type:String , enum :[ "pending" , "approved" , "rejected"] ,  default: "pending"},
    typeOfAsset:{type:String, default:"venue"},
    location: { type: Schema.Types.ObjectId, ref: "Location", required: true },
    host:{type: Schema.Types.ObjectId,ref: "Host",required: true }

  },
  {
    timestamps: true,
  }
);

export const VenueModel = mongoose.model<IVenue>("Venue", venueSchema);
