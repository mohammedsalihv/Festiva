import { Types } from "mongoose";

export interface IStudio {
  studioName: string;
  packages: {
    packageName: string;
    payment: string;
    packageIncludes?: string[];
    manPower: string;
    equipments: string[];
    deliveryTime: string;
    validity: string;
  }[];
  timeSlots: string[];
  availableDates: string[];
  serviceFeatures: string[];
  terms: string;
  description: string;
  about: string;
  Images: string[];
  status?: string;
  rejectedReason?: string;
  isReapplied?: boolean;
  isAvailable?: boolean;
  typeOfAsset?: string;
  location?: Types.ObjectId;
  host?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IStudioBase {
  _id: string;
  packagesCount: number;
  name: string;
  assetType: "studio";
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

export const mapStudioToBase = (studio: any): IStudioBase => ({
  _id: studio._id.toString(),
  name: studio.studioName,
  assetType: studio.assetType,
  status: studio.status,
  Images: studio.Images,
  packagesCount: studio.packages?.length || 0,
  location: {
    _id: studio.location?._id?.toString(),
    city: studio.location?.city,
    state: studio.location?.state,
    country: studio.location?.country,
  },
});
