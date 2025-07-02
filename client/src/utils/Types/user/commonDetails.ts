import { IStudio } from "./studioTypes";
import { ICaters } from "./catersTypes";
import { IVenue } from "./venueTypes";
import { IRentCar } from "./rentCarTypes";

export type AssetType = "venue" | "rentcar" | "caters" | "studio";
export type IAsset =
  | (IVenue & { typeOfAsset: "venue" })
  | (IRentCar & { typeOfAsset: "rentcar" })
  | (ICaters & { typeOfAsset: "caters" })
  | (IStudio & { typeOfAsset: "studio" });

export interface assetDetailsHostInfo {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profilePic?: string;
}

export interface assetDetailsLocationInfo {
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
