import { Types } from "mongoose";

export interface IStudio {
  studioName: string;
  packages: {
    packageName: string;
    payment: string;
    packageIncludes?: string[];
    manPower: string;
    equipments: string;
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
  location?: Types.ObjectId;
  host?: Types.ObjectId;
}
