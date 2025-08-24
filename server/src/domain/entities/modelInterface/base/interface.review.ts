import { Types } from "mongoose";

export interface IReview {
  createrId: Types.ObjectId;
  receiverId: string | Types.ObjectId
  rating: number;
  comment: string;
  assetId: Types.ObjectId;
  assetType:string;
  timestamp: string;
}
