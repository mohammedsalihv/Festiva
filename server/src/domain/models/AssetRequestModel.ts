import mongoose, { Schema} from "mongoose";
import { IAssetRequest } from "../entities/serviceInterface/interface.assetRequest";

const AssetRequestSchema = new Schema<IAssetRequest>(
  {
    hostId: { type: Schema.Types.ObjectId, ref: "Host", required: true },
    status: {
      type: String,
      enum: ["Approved", "Rejected", "Pending"],
      required: true,
    },
    assetType: {
      type: String,
      enum: ["studio", "venue", "rentcar", "caters"],
      required: true,
    },
    assetId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export const AssetRequestModel = mongoose.model<IAssetRequest>(
  "AssetRequest",
  AssetRequestSchema
);
