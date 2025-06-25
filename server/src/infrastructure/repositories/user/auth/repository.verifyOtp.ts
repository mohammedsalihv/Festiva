import { IOTPVerifyRepository } from "../../../../domain/entities/repositoryInterface/user/authentication/interface.verifyOtprepository";
import { IOTP } from "../../../../domain/entities/modelInterface/interface.otp";
import { OTP } from "../../../../domain/models/otpModel";

export class OTPVerifyRepository implements IOTPVerifyRepository {
  async findLatestOTPByEmail(email: string): Promise<IOTP | null> {
    return OTP.findOne({ email }).sort({ createdAt: -1 }).exec();
  }
}
