import { assetDetailsHostInfo } from "@/utils/Types/user/commonDetails";
import { assetDetailsLocationInfo } from "@/utils/Types/user/commonDetails";

export interface IStudio {
  _id: string;
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
  createdAt:string;
  isReapplied:boolean;
  isAvailable:boolean;
  rejectedReason:string;
  typeOfAsset: string;
  location?: assetDetailsLocationInfo;
  host?: assetDetailsHostInfo;
}
