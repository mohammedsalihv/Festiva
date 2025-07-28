import {
  assetDetailsHostInfo,
  assetDetailsLocationInfo,
} from "./commonDetails";

export interface IVenueBase {
  _id: string;
  name: string;
  assetType: "venue";
  amount: string;
  status?: "pending" | "approved" | "rejected";
  location: assetDetailsLocationInfo;
  Images?: string[];
  [key: string]: unknown;
}

export interface IVenue {
  _id?: string;
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
  status?: string;
  typeOfAsset?: string;
  location: assetDetailsLocationInfo;
  host: assetDetailsHostInfo;
}
