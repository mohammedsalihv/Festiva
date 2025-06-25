import { Types } from "mongoose";

export interface IVenue {
    venueName?: string;
    rent?: number;
    capacity?: number;
    shift?: string;
    squareFeet?: number;
    timeSlots?: string[];
    availableDates?: string[];
    about?: string;
    features: string[];
    parkingFeatures: string[];
    description?: string;
    terms: string;
    Images?: string[];
    status?:string;
    typeOfAsset?:string;
    location: Types.ObjectId;
    host: Types.ObjectId;
}


export interface IVenueBase {
  _id: string;
  venueName: string;
  typeOfAsset: "venue";
  rent?: number;
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
  venueName: venue.venueName || "",
  typeOfAsset: "venue",
  rent: venue.rent,
  status: venue.status,
  Images: venue.Images,
  location: {
    _id: venue.location?._id?.toString(),
    city: venue.location?.city,
    state: venue.location?.state,
    country: venue.location?.country,
  },
});