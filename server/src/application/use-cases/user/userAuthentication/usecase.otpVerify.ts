import { IOTPVerifyRepository } from "../../../../domain/entities/repositoryInterface/user/interface.verifyOtpRepository";
import CustomError from "../../../../utils/common/errors/CustomError";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class OtpVerificationUseCase {
  constructor(private otpRepository: IOTPVerifyRepository) {}

  async execute(email: string, otp: string): Promise<void> {
    if (!email || !otp) {
      throw new CustomError("Email and OTP required", statusCodes.forbidden);
    }

    const latestOtp = await this.otpRepository.findLatestOTPByEmail(email);
    if (!latestOtp) {
      throw new CustomError("OTP not found", statusCodes.notfound);
    }
    if (latestOtp.otp !== otp) {
      throw new CustomError("OTP not matched", statusCodes.serverError);
    }
  }
}
