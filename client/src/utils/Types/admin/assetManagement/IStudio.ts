import { assetHostInfo, assetLocationInfo } from "./commonAssets";

export interface IStudio {
  _id:string;
  studioName?: string;
  packages?: {
    packageName?: string;
    payment?: string;
    packageIncludes?: string[];
    manPower: string;
    equipments: string;
    deliveryTime: string;
    validity: string;
  };
  timeSlots?: string[];
  availableDates?: string[];
  features?: string[];
  terms?: string;
  conditions?: string;
  about: string;
  workImages: string[];
  status?: string;
  typeOfAsset?: string;
  location: assetLocationInfo;
  host: assetHostInfo;
}

export interface studioRequestProps {
  data: IStudio;
}
