import { assetDetailsHostInfo ,assetDetailsLocationInfo } from "./commonDetails";


export interface IStudioBase {
  _id: string;
  packagesCount: number;
  name: string;
  amount:string;
  assetType: "studio";
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
  typeOfAsset?: string;
  location?: assetDetailsLocationInfo;
  host?: assetDetailsHostInfo;
}