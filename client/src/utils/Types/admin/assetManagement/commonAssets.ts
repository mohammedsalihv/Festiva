import { IVenue } from "./IVenue";
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

export interface singleAssetResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface allAssetsResponse {
  data: [];
  message: string;
  success: boolean;
}

export interface assetStatusResponse {
  message: string;
  success: boolean;
}

export type assetDetailTypes = IVenue | IStudio | IRentCar | ICaters;

interface normalizeAsset {
  name: string;
  hostName: string;
  image: string;
}

export const normalizeAssetData = (
  asset: assetDetailTypes & { host?: assetHostInfo }
): normalizeAsset => {
  const type = asset.typeOfAsset;
  let name = "Unknown";
  let image = "";
  const hostName = asset.host?.name;

  switch (type) {
    case "venue":
      name = (asset as IVenue).venueName ?? "Unnamed Venue";
      image = (asset as IVenue).Images?.[0] ?? "";
      break;
    case "studio":
      name = (asset as IStudio).studioName ?? "Unnamed Studio";
      image = (asset as IStudio).Images?.[0] ?? "";
      break;
    case "car":
      name = (asset as IRentCar).businessName ?? "Unnamed Car";
      image = (asset as IRentCar).Images?.[0] ?? "";
      break;
    case "cater":
      name = (asset as ICaters).catersName ?? "Unnamed Caterer";
      image = (asset as ICaters).Images?.[0] ?? "";
      break;
    default:
      name = "Unknown Asset";
      image = "";
  }
  return {
    name,
    image,
    hostName,
  };
};
