import { Types } from "mongoose";
type AssetType = "venue" | "rentcar" | "studio" | "caters";

export interface CreateAssetNotificationDTO {
  createrId: string | Types.ObjectId;
  receiverId: string | Types.ObjectId;
  assetId: string | Types.ObjectId;
  assetType: AssetType;
  status: 'approved' | 'rejected' | 'created' | 'accepted'; 
  message: string;
}
