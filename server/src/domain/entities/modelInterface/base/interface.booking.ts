import { IAsset, AssetType } from "../../../../types/base/AssetTypes/assets";
import { Types } from "mongoose";

export interface IBooking {
  _id?:string|Types.ObjectId;
  bookingId?: string;
  userId:  Types.ObjectId;
  assetId:  Types.ObjectId;
  assetType: AssetType;
  selectedDates: string[] | string;
  selectedTimeSlot?: string;
  attendeesCount?: number;
  manpowerCout?:number;
  packageName?: string;
  seletedPackage?:[],
  total: number;
  bookedData: IAsset;
  transactionId:string;
  paymentId: Types.ObjectId;
  status: string;
  bookingRejectedReason?:string;
  createdAt?: Date;
  updatedAt?: Date;
}
