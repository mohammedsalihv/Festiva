import mongoose, { Schema } from "mongoose";
import { IHostModel } from "../../../databaseModelInterfaces/hostModelInterfaces/interface.host";

const HostSchema = new Schema<IHostModel>({
  name: { type: String, required: true },
  phone: { type: String },
  password: { type: String },
  email: { type: String, required: true },
  role: { type: String, enum: ["host", "user"], default: "host" },
  profilePic: { type: String },
  location: { type: String },
  isBlocked: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  isSubscriber: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  listedAssets: { type: Number, default: 0 },
  totalRequests: { type: Number, default: 0 },
  acceptedRequests: { type: Number, default: 0 },
  rejectedRequests: { type: Number, default: 0 },
  signupMethod: { type: String, enum: ["manual", "google"], default: "manual" },
  timestamp: { type: Date, default: Date.now },
});

export const HostModel = mongoose.model<IHostModel>("Host", HostSchema);
