import { Request, Response } from "express";
import { OtpVerificationUseCase } from "../../../../application/use-cases/user/userAuthentication/usecase.otpVerify";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class VerifyOtpController {
  constructor(private verifyOtp: OtpVerificationUseCase) {}

  async verifyOTP(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;
      await this.verifyOtp.execute(email, otp);
      res.status(statusCodes.Success).json({
        success: true,
        message: "OTP verified successfully",
      });
    } catch (error: any) {
      res.status(statusCodes.serverError).json({
        success: false,
        message: error.message,
      });
    }
  }
}
