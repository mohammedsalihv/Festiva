import mongoose, {Schema} from "mongoose"
import { IUser } from "../entities/modelInterface/user.interface"

const UserSchema = new Schema<IUser>({
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

export const UserModal = mongoose.model<IUser>("User", UserSchema);
