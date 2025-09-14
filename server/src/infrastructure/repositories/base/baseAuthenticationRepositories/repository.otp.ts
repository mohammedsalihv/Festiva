import { IOTPRepository } from "../../../../domain/repositoryInterfaces/baseRepositoryInterfaces/baseAuthenticationRepositoryInterfaces/interface.otpRepository";
import { IOTP } from "../../../../domain/entities/databaseModelInterfaces/baseModelInterfaces/interface.otp";
import { OTPModel } from "../../../../domain/entities/databaseModels/baseModels/baseAuthenticationModels/otpModel";

export class OTPRepository implements IOTPRepository {
  async findByEmail(email: string): Promise<IOTP | null> {
    return OTPModel.findOne({ email });
  }

  async createOTP(otpData: Partial<IOTP>): Promise<IOTP> {
    return OTPModel.create(otpData);
  }

  async verifyOTP(otp: string): Promise<IOTP | null> {
    return OTPModel.findOne({ otp });
  }

  async deleteOTP(email: string): Promise<void> {
    await OTPModel.deleteOne({ email });
  }
}
