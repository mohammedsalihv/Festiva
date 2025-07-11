import { assetDetailsHostInfo , assetDetailsLocationInfo } from "./commonDetails";



export interface IRentCarBase {
  _id: string;
  name: string;
  assetType: "rentcar";
  amount?: string;
  status?: "pending" | "approved" | "rejected";
  location: {
    _id: string;
    city?: string;
    state?: string;
    country?: string;
  };
  Images?: string[];
  [key: string]: unknown;
}


export interface IRentCar {
  businessName?: string;
  carName?: string;
  rent?: string;
  make?: string;
  model?: string;
  timeSlots?: string[];
  availableDates?: string[];
  color?: string;
  fuel?: string;
  transmission?: string;
  seats?: string;
  deposite?: string;
  carFeatures?: string[];
  additionalFeatures?: string[];
  termsOfUse?: string[];
  about?: string;
  description?: string;
  guidelines: string;
  userDocument: string;
  Images?: string[];
  status?: string;
  typeOfAsset?: string;
  location: assetDetailsLocationInfo;
  host: assetDetailsHostInfo;
}

