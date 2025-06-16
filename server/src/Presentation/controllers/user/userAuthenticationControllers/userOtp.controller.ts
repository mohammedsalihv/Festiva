import { Request, Response } from "express";
import { OtpSendingUseCase } from "../../../../application/use-cases/user/userAuthentication/usecase.otpSending";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";

export class OTPController {
  constructor(private sendOTPUseCase: OtpSendingUseCase) {}

  async sendOTP(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email) {
        res
          .status(statusCodes.unAuthorized)
          .json({ success: false, message: statusMessages.invalidMail });
        return;
      }

      const response = await this.sendOTPUseCase.execute(email);
      res
        .status(response.success ? statusCodes.Success : statusCodes.conflict)
        .json(response);
    } catch (error: any) {
      logger.error("Error in sendOTPController:", error);

      if (error.message === "User already exists") {
        return res
          .status(statusCodes.conflict)
          .json({ success: false, message: statusMessages.accountExisted });
      }

      if (error.message === "Invalid email format") {
        return res
          .status(statusCodes.forbidden)
          .json({ success: false, message: statusMessages.invalidMail });
      }

      if (error.name === "ValidationError") {
        return res
          .status(statusCodes.forbidden)
          .json({ success: false, message: error.message });
      }

      return res.status(statusCodes.serverError).json({
        success: false,
        message: error.message,
      });
    }
  }
}
