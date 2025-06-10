import { Types } from "mongoose";

export interface IRentCar {
  businessName?: string;
  carName?:string;
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
  carImages?: string[];
  status?: string;
  typeOfAsset?: string;
  location: Types.ObjectId;
  host: Types.ObjectId;
}
