import { IOTPRepository } from "../../../../domain/entities/repositoryInterface/user/authentication/interface.otpRepository";
import { IOTP } from "../../../../domain/entities/modelInterface/interface.otp";
import { OTP } from "../../../../domain/models/otpModel";

export class OTPRepository implements IOTPRepository {
  async findByEmail(email: string): Promise<IOTP | null> {
    return OTP.findOne({ email });
  }

  async createOTP(otpData: Partial<IOTP>): Promise<IOTP> {
    return OTP.create(otpData);
  }

  async deleteOTP(email: string): Promise<void> {
    await OTP.deleteOne({ email });
  }
}
