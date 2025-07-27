import { assetHostInfo, assetLocationInfo } from "./commonAssets";

export interface IStudio {
  _id:string;
  studioName: string;
  packages: {
    _id:string;
    packageName: string;
    payment: string;
    packageIncludes: string[];
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
  rejectedReason?:string;
  typeOfAsset?: string;
  location?: assetLocationInfo;
  host?: assetHostInfo;
}

export interface studioRequestProps {
  data: IStudio;
}
