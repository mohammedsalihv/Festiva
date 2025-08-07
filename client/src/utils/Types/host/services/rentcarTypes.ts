import { assetDetailsLocationInfo } from "../../user/commonDetails";
import { assetDetailsHostInfo } from "../../user/commonDetails";

export interface IRentCar {
  _id: string;
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
  Images: string[];
  status?: string;
  isReapplied:boolean;
  rejectedReason:string;
  isAvailable:boolean;
  createdAt:string;
  typeOfAsset: string;
  location: assetDetailsLocationInfo;
  host: assetDetailsHostInfo;
}
