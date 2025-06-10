import { Types } from "mongoose";

export interface ICaters {
  catersName?: string;
  manpower:string;
  rent:string
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
