import { Request, Response } from "express";
import { SendOTP } from "../../../../application/use-cases/user/Auth/sentOtp";

export class OTPController {
  constructor(private sendOTPUseCase: SendOTP) {}

  async sendOTP(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email) {
        res.status(400).json({ success: false, message: "Email is required" });
        return;
      }

      const response = await this.sendOTPUseCase.execute(email);
      res.status(response.success ? 200 : 409).json(response);
    } catch (error: any) {
      console.error("Error in sendOTPController:", error);

      if (error.message === "User already exists") {
        return res
          .status(409)
          .json({ success: false, message: "User already exists" });
      }

      if (error.message === "Invalid email format") {
        return res
          .status(400)
          .json({ success: false, message: "Invalid email format" });
      }

      if (error.name === "ValidationError") {
        return res.status(400).json({ success: false, message: error.message });
      }

      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }
}
