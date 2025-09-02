import { Types } from "mongoose";

export interface adminBookingsResponse {
  _id: string;
  assetName: string;
  assetImage: string;
  assetType: string;
  Date: string | string[];
  timeSlot: string;
  bookedUserName: string;
  bookedUserEmail: string;
  bookedDate: string;
  status: string;
  hostName: string;
  hostEmail: string;
}
