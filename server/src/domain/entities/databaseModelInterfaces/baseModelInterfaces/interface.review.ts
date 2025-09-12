import { Types } from "mongoose";

export interface IReview {
  _id?: string;
  createrId: Types.ObjectId;
  receiverId: string | Types.ObjectId;
  rating: number;
  comment: string;
  assetId: Types.ObjectId;
  assetType: string;
  timestamp?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface hostReviewsResponse {
  _id?: string;
  createrName: string;
  createrProfilePic: string;
  createrRole: string;
  rating: number;
  review: string;
  assetType: string;
}
