import mongoose, { Schema } from "mongoose";
import { IOTP } from "../entities/modelInterface/interface.otp";
import { sendVerificationEmail } from "../../utils/common/communication/otpMailSender";

const OTPSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

OTPSchema.pre<IOTP>("save", async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

export const OTP = mongoose.model<IOTP>("OTP", OTPSchema);
