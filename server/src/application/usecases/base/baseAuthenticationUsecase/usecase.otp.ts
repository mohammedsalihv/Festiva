import { IOTPUseCase } from "../../../../domain/usecaseInterfaces/baseUsecaseInterfaces/baseAuthenticationUsecaseInterfaces/interface.otpUseCase";
import { IOTPRepository } from "../../../../domain/repositoryInterfaces/baseRepositoryInterfaces/baseAuthenticationRepositoryInterfaces/interface.otpRepository";
import { OTPSendingDTO } from "../../../../types/DTO's/userDTO's/userAuthenticationDTO's/dto.otp";
import { generateOTP } from "../../../../utils/baseUtilities/communication/otpGenerator";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";
import { statusCodes } from "../../../../utils/baseUtilities/messages/constantResponses";

export class OTPUseCase implements IOTPUseCase {
  private RESEND_WAIT_TIME = 60 * 1000;

  constructor(private _otpRepository: IOTPRepository) {}

  async sendOTP(email: string): Promise<OTPSendingDTO> {
    const existingOTP = await this._otpRepository.findByEmail(email);

    if (existingOTP) {
      const timeElapsed = Date.now() - existingOTP.createdAt.getTime();
      if (timeElapsed < this.RESEND_WAIT_TIME) {
        throw new CustomError(
          "OTP already sent. Please wait 1 minute before requesting again",
          statusCodes.toManyRequests
        );
      }
      await this._otpRepository.deleteOTP(email);
    }
    const otp = generateOTP();
    await this._otpRepository.createOTP({ email, otp });

    return {
      success: true,
      message: "OTP sent successfully",
      otp,
    };
  }

  async verifyOTP(email: string, otp: string): Promise<void> {
    if (!email || !otp) {
      throw new CustomError("Email and OTP required", statusCodes.forbidden);
    }

    const latestOtp = await this._otpRepository.findByEmail(email);
    if (!latestOtp) {
      throw new CustomError("OTP not found", statusCodes.notfound);
    }

    if (latestOtp.otp !== otp) {
      throw new CustomError("OTP not matched", statusCodes.serverError);
    }

    await this._otpRepository.deleteOTP(email);
  }

  async deleteExpiredOTPs(email: string): Promise<void> {
    if (!email) {
      throw new CustomError("Email is required", statusCodes.forbidden);
    }
    await this._otpRepository.deleteOTP(email);
  }
}
