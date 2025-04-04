import { Request, Response } from "express";
import { SendOTP } from "../../../../application/use-cases/user/Auth/sentOtp";


export class OTPController {
  constructor(private sendOTPUseCase: SendOTP) {}

  async sendOTP(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      if (!email) {
        res.status(400).json({ success: false, message: "Email is required" });
        return;
      }

      const response = await this.sendOTPUseCase.execute(email);
      res.status(response.success ? 200 : 409).json(response);
    } catch (error) {
      console.error("Error in sendOTPController:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
}