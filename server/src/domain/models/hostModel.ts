import mongoose, { Schema } from "mongoose";
import { IHost } from "../entities/modelInterface/host.interface";

const HostSchema = new Schema<IHost>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ["host", "user"], default: "host" },
  profile_pic: { type: String, required: false, default: "" }, 
  location: { type: String, required: true },
  isBlocked:{ type:Boolean , default:false},
  isVerfied:{type:Boolean , default:false },
  isSubscriber:{type:Boolean , default:false },
  isActive:{type:Boolean , default:true },
  listedAssets:{type:Number , default:0 },
  totalRequests:{type:Number , default:0 },
  acceptedRequests:{type:Number , default:0 },
  rejectedRequests:{type:Number , default:0 },
  timestamp: { type: Date, default: Date.now },
});

export const HostModel = mongoose.model<IHost>("Host", HostSchema);
