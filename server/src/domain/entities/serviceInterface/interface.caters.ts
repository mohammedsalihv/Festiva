import { Types } from "mongoose";

export interface ICaters {
  catersName?: string;
  manpower:string;
  charge:string;
  totalAmount:string;
  timeSlots?: string[];
  availableDates?: string[];
  description?:string;
  features?: string[];
  serviceTypes?: string[];
  terms?: string;
  conditions?: string;
  about: string;
  Images: string[];
  status?: string;
  typeOfAsset?: string;
  location: Types.ObjectId;
  host: Types.ObjectId;
}
