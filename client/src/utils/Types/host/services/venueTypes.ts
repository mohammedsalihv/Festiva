import { assetDetailsLocationInfo } from "../../user/commonDetails";
import { assetDetailsHostInfo } from "../../user/commonDetails";


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
  Images: string[];
  status?: string;
  createdAt:string;
  isReapplied:boolean;
  isAvailable:boolean;
  typeOfAsset: string;
  location: assetDetailsLocationInfo;
  host: assetDetailsHostInfo;
}


export interface addVenueData {
  venueName?: string;
  rent?: string;
  capacity?: string;
  shift?: string;
  squareFeet?: string;
  timeSlots?: string[];
  availableDates?: string[];
  details?: string;
  features: string[];
  parkingFeatures: string[];
  description: string;
  terms: string;
  Images: File[];
  location: object;
}

export interface venueFormState {
  venueName: string;
  rent: string;
  capacity: string;
  shift: string;
  squareFeet: string;
  timeSlots: string[];
  availableDates: string[];
  description: string;
}

export interface VenueFormErrorState {
  venueName?: string;
  rent?: string;
  capacity?: string;
  shift?: string;
  squareFeet?: string;
  timeSlots?: string[];
  availableDates?: string[];
  description?: string;
}

export const venueFormInitialState: venueFormState = {
  venueName: "",
  rent: "",
  capacity: "",
  shift: "",
  squareFeet: "",
  timeSlots: [],
  availableDates: [],
  description: "",
};

export interface venueDetailsFormState {
  features: string[];
  parkingFeatures: string[];
  about: string;
  terms: string;
}

export const venueDetailsFormInitialState: venueDetailsFormState = {
  features: [],
  parkingFeatures: [],
  about: "",
  terms: "",
};

export interface venueDetailsFormErrorState {
  features: string[];
  parkingFeatures: string[];
  about: string;
  terms: string;
}
