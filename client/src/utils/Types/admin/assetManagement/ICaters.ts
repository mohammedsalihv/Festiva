import { assetHostInfo, assetLocationInfo } from "./commonAssets";

export interface ICaters {
  _id:string,
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
  location: assetLocationInfo;
  host: assetHostInfo;
}

export interface catersRequestProps {
  data: ICaters;
}
