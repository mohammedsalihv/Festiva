import { assetDetailsLocationInfo } from "../../user/commonDetails";
import { assetDetailsHostInfo } from "../../user/commonDetails";

export interface ICaters {
  _id: string;
  catersName?: string;
  manpower: string;
  charge: string;
  totalAmount: string;
  timeSlots?: string[];
  availableDates?: string[];
  description?: string;
  features?: string[];
  serviceTypes?: string[];
  terms?: string;
  conditions?: string;
  about: string;
  Images: string[];
  status?: string;
  createdAt:string;
  isReapplied:boolean;
  isAvailable:boolean;
  rejectedReason:string;
  typeOfAsset: string;
  location: assetDetailsLocationInfo;
  host: assetDetailsHostInfo;
}


export interface catersFormErrorState {
  catersName?: string;
  manpower?: string;
  charge?: string;
  totalAmount?: string;
  timeSlots?: string;
  availableDates?: string;
}

export interface catersFormState {
  catersName: string;
  manpower: string;
  charge: string;
  totalAmount: string;
  timeSlots: string[];
  availableDates: string[];
}

export const initialCatersFormState: catersFormState = {
  catersName: "",
  manpower: "",
  charge: "",
  totalAmount: "",
  timeSlots: [],
  availableDates: [],
};

export interface catersDetailsFormErrorState {
  features: string[];
  serviceTypes: string[];
  conditions?: string;
  about?: string;
  description?: string;
}

export interface catersDetailsFormState {
  features: string[];
  serviceTypes: string[];
  conditions: string;
  about: string;
  description: string;
}

export const initialCatersDetailsFormState: catersDetailsFormState = {
  conditions: "",
  about: "",
  description: "",
  serviceTypes: [],
  features: [],
};
