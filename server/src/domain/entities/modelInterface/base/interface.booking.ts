import { IAsset, AssetType } from "../../../../types/base/AssetTypes/assets";
import { Types } from "mongoose";

export interface IBooking {
  bookingId?: string;
  userId:  Types.ObjectId;
  assetId:  Types.ObjectId;
  assetType: AssetType;
  selectedDates: string[] | string;
  selectedTimeSlot?: string;
  attendeesCount?: string;
  packageName?: string;
  total: number;
  serviceData: IAsset;
  transactionId:string;
  paymentId: Types.ObjectId;
  status: "pending" | "confirmed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}
