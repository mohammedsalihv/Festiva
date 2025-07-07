import { Document, Types } from "mongoose";

export interface IAssetRequest extends Document {
  hostId: Types.ObjectId;
  status: "Approved" | "Rejected" | "Pending";
  assetType: "studio" | "venue" | "rentcar" | "caters";
  assetId: Types.ObjectId; 
  createdAt: Date;
}
