import { Types } from "mongoose";

export interface IReview {
  createrId: Types.ObjectId;
  receiverId: Types.ObjectId;
  rating: number;
  comment: string;
  assetId: Types.ObjectId;
  timestamp: string;
}
