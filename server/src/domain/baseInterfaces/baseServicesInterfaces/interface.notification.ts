import { Types } from "mongoose";

export interface INotification {
  _id?: Types.ObjectId;
  createrId: Types.ObjectId;
  receiverId: Types.ObjectId;
  assetId: Types.ObjectId;
  assetType: string;
  status: string;
  message: string;
  isRead: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
