import { assetHostInfo, assetLocationInfo } from "./commonAssets";

export interface IRentCar {
  _id:string;
  businessName?: string;
  carName?: string;
  rent?: string;
  make?: string;
  model?: string;
  timeSlots?: string[];
  availableDates?: string[];
  year?: string;
  plate?: string;
  color?: string;
  fuel?: string;
  transmission?: string;
  seats?: string;
  deposite?: string;
  features?: string[];
  inclusion?: string;
  terms?: string;
  Images?: string[];
  status?: string;
  typeOfAsset?: string;
  location: assetLocationInfo;
  host: assetHostInfo;
}

export interface rentCarRequestProps {
  data: IRentCar;
}
