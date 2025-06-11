import { IVenue } from "./Ivenue";
import { IStudio } from "./IStudio";
import { ICaters } from "./ICaters";
import { IRentCar } from "./IRentCar";

export interface assetHostInfo {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profilePic?: string;
}

export interface assetLocationInfo {
  location: {
    _id: string;
    houseNo?: string;
    street?: string;
    district?: string;
    state?: string;
    country?: string;
    zip?: string;
  };
}

export interface GetServicesResponse {
  data: [];
  message: string;
  success: boolean;
}


export interface assetStatusResponse {
  message: string;
  success: boolean;
}

export type AssetDetail = IVenue | IStudio | IRentCar | ICaters;
