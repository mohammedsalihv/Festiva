import { assetHostInfo, assetLocationInfo } from "./commonAssets";
export interface ICaters {
  _id: string;
  catersName?: string;
  manpower: string;
  rent: string;
  timeSlots?: string[];
  availableDates?: string[];
  features?: string[];
  terms?: string;
  conditions?: string;
  about: string;
  Images: string[];
  status?: string;
  typeOfAsset?: string;
  location: assetLocationInfo;
  timstamp?:string;
  host: assetHostInfo;
}

export interface catersRequestProps {
  data: ICaters;
}
