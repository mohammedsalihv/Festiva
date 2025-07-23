import {
  assetDetailsHostInfo,
  assetDetailsLocationInfo,
} from "./commonDetails";

export interface ICatersBase {
  _id: string;
  name: string;
  assetType: "caters";
  amount?: string;
  status?: "pending" | "approved" | "rejected";
  location: assetDetailsLocationInfo;
  Images?: string[];
  [key: string]: unknown;
}

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
  typeOfAsset?: string;
  location: assetDetailsLocationInfo;
  host: assetDetailsHostInfo;
}
