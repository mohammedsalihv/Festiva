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
  assetType: string;
  image: string;
}

export const normalizeAssetData = (
  asset: assetDetailTypes & { host?: assetHostInfo; typeOfAsset?: string }
): normalizeAsset => {
  const type = asset.typeOfAsset ?? "unknown";
  let name = "Unknown";
  let image = "";
  const assetType = type;

  const getFirstImage = (imgs: any) =>
    Array.isArray(imgs) && imgs.length > 0 ? imgs[0] : "";

  switch (type) {
    case "venue":
      name = (asset as IVenue).venueName ?? "Unnamed Venue";
      image = getFirstImage((asset as IVenue).Images);
      break;
    case "studio":
      name = (asset as IStudio).studioName ?? "Unnamed Studio";
      image = getFirstImage((asset as IStudio).Images);
      break;
    case "car":
      name = (asset as IRentCar).businessName ?? "Unnamed Car";
      image = getFirstImage((asset as IRentCar).Images);
      break;
    case "cater":
      name = (asset as ICaters).catersName ?? "Unnamed Caterer";
      image = getFirstImage((asset as ICaters).Images);
      break;
    default:
      name = "Unknown Asset";
      image = "";
  }

  return {
    name,
    image,
    assetType,
  };
};
