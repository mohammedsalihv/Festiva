import { assetHostInfo , assetLocationInfo } from "./commonAssets";

export interface IVenue {
  _id:string;
  venueName?: string;
  rent?: number;
  capacity?: number;
  shift?: string;
  squareFeet?: number;
  timeSlots?: string[];
  availableDates?: string[];
  description?: string;
  features: string[];
  parkingFeatures: string[];
  about: string;
  terms: string;
  Images: string[];
  status?: string;
  typeOfAsset?: string;
  location: assetLocationInfo;
  host: assetHostInfo;
}

export interface venueRequestProps {
  data: IVenue;
}
