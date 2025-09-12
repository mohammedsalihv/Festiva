import { Types } from "mongoose";

export interface IVenue {
  venueName: string;
  rent?: string;
  capacity?: string;
  shift?: string;
  squareFeet?: string;
  timeSlots?: string[];
  availableDates?: string[];
  about?: string;
  features: string[];
  parkingFeatures: string[];
  description?: string;
  terms: string;
  Images?: string[];
  status?: string;
  rejectedReason?: { type: String; default: "" };
  isReapplied?: boolean;
  isAvailable?: boolean;
  typeOfAsset?: string;
  location: Types.ObjectId;
  host: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IVenueBase {
  _id: string;
  name: string;
  assetType: "venue";
  amount?: string;
  status?: "pending" | "approved" | "rejected";
  location: {
    _id: string;
    city?: string;
    state?: string;
    country?: string;
  };
  Images?: string[];
  [key: string]: any;
}

export const mapVenueToBase = (venue: any): IVenueBase => ({
  _id: venue._id.toString(),
  name: venue.venueName,
  assetType: venue.assetType,
  amount: venue.rent,
  status: venue.status,
  Images: venue.Images,
  location: {
    _id: venue.location?._id?.toString(),
    city: venue.location?.city,
    state: venue.location?.state,
    country: venue.location?.country,
  },
});
