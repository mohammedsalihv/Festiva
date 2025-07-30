import { Types } from "mongoose";

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
  rejectedReason?:string;
  isReapplied?:boolean;
  isAvailable?: boolean;
  typeOfAsset?: string;
  location: Types.ObjectId;
  host: Types.ObjectId;
}

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
  [key: string]: any;
}

export const mapRentCarToBase = (car: any): IRentCarBase => ({
  _id: car._id.toString(),
  name: car.carName,
  assetType: car.assetType,
  amount: car.rent,
  status: car.status,
  Images: car.Images,
  location: {
    _id: car.location?._id?.toString(),
    city: car.location?.city,
    state: car.location?.state,
    country: car.location?.country,
  },
});
