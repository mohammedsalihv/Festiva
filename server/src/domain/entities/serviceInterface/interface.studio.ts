import { Types } from "mongoose";

export interface IStudio {
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
  location: Types.ObjectId;
  host: Types.ObjectId;
}
