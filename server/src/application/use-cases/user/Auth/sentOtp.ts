import { IOTPRepository } from "../../../../domain/entities/repositoryInterface/user/interface.otpRepository";
import { generateOTP } from "../../../../utils/otpGenerator";

export class SendOTP {
  private RESEND_WAIT_TIME = 60 * 1000;

  constructor(private otpRepository: IOTPRepository) {}

  async execute(email: string): Promise<{ success: boolean; message: string; otp?: string }> {
    const existingOTP = await this.otpRepository.findByEmail(email);

    if (existingOTP) {
      const timeElapsed = Date.now() - existingOTP.createdAt.getTime();

      if (timeElapsed < this.RESEND_WAIT_TIME) {
        return { success: false, message: "OTP already sent. Please wait 1 minute before requesting again." };
      }

      await this.otpRepository.deleteOTP(email);
    }

    const otp = generateOTP();
    await this.otpRepository.createOTP({ email, otp });

    return { success: true, message: "OTP sent successfully", otp };
  }
}
