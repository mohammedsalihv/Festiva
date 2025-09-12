import { Types } from "mongoose";

export interface ICaters {
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
  rejectedReason?: string;
  isReapplied?: boolean;
  isAvailable?: boolean;
  typeOfAsset?: string;
  location: Types.ObjectId;
  host: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICatersBase {
  _id: string;
  name: string;
  assetType: "caters";
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

export const mapCatersToBase = (caters: any): ICatersBase => ({
  _id: caters._id.toString(),
  name: caters.catersName,
  assetType: caters.assetType,
  amount: caters.totalAmount,
  status: caters.status,
  Images: caters.Images,
  location: {
    _id: caters.location?._id?.toString(),
    city: caters.location?.city,
    state: caters.location?.state,
    country: caters.location?.country,
  },
});
