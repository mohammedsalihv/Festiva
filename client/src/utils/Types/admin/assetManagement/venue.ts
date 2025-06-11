import { assetHostInfo , assetLocationInfo } from "./commonAssets";

export interface venueResponse {
  id:string;
  venueName?: string;
  rent?: number;
  capacity?: number;
  shift?: string;
  squareFeet?: number;
  timeSlots?: string[];
  availableDates?: string[];
  details?: string;
  features: string[];
  parkingFeatures: string[];
  venueDescription: string;
  terms: string;
  venueImages: string[];
  status?: string;
  typeOfAsset?: string;
  location: assetLocationInfo;
  host: assetHostInfo;
}

export interface venueRequestProps {
  data: venueResponse;
}
