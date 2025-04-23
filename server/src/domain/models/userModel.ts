import mongoose, {Schema} from "mongoose"
import { Iuser } from "../entities/modelInterface/user.interface"

const UserSchema = new Schema<Iuser>({
  firstname: { type: String, required: true },
  lastname: { type: String },
  email: { type: String, required: true },
  password: { type: String },
  phone: { type: String },
  profilePic: { type: [String] },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  googleId: { type: String },
  gender: { type: String },
  country: { type: String },
  timestamp: { type: Date, default: Date.now },
});

export const UserModal = mongoose.model<Iuser>("User", UserSchema);
