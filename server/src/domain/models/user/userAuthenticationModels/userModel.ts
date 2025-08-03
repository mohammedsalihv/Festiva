import mongoose, { Schema } from "mongoose";
import { IUserModel } from "../../../entities/modelInterface/user/interface.user";

const UserSchema = new Schema<IUserModel>({
  firstname: { type: String, required: false },
  lastname: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  phone: { type: String, required: false },
  profilePic: { type: String, required: false },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: true,
  },
  isActive: { type: Boolean, default: true, required: true },
  isBlocked: { type: Boolean, default: false, required: true },
  timestamp: { type: Date, default: Date.now, required: true },
});

export const UserModel = mongoose.model<IUserModel>("User", UserSchema);
