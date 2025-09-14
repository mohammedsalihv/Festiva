import { Request, Response } from "express";
import { IOTPController } from "../../../../domain/controllerInterfaces/baseControllerInterfaces/baseAuthenticationInterfaces/interface.otpController";
import { IOTPUseCase } from "../../../../domain/usecaseInterfaces/baseUsecaseInterfaces/baseAuthenticationUsecaseInterfaces/interface.otpUseCase";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/baseUtilities/messages/constantResponses";
import logger from "../../../../utils/baseUtilities/messages/logger";

export class OTPController implements IOTPController {
  constructor(private _otpUseCase: IOTPUseCase) {}

  async otpSending(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(statusCodes.unAuthorized).json({
          success: false,
          message: statusMessages.invalidMail,
        });
        return;
      }

      const response = await this._otpUseCase.sendOTP(email);

      res
        .status(response.success ? statusCodes.Success : statusCodes.conflict)
        .json(response);
    } catch (error: any) {
      logger.error("OTP Sending Error:", error);
      res.status(error.statusCode || statusCodes.serverError).json({
        success: false,
        message: error.message || statusMessages.serverError,
      });
    }
  }
  async otpVerification(req: Request, res: Response): Promise<void> {
    try {
      const { email, otp } = req.body;
      await this._otpUseCase.verifyOTP(email, otp);
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
  async otpDeleting(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(statusCodes.unAuthorized).json({
          success: false,
          message: statusMessages.invalidMail,
        });
        return;
      }

      await this._otpUseCase.deleteExpiredOTPs(email);

      res.status(statusCodes.Success).json({
        success: true,
        message: "OTP deleted successfully",
      });
    } catch (error: any) {
      logger.error("OTP Deleting Error:", error);
      res.status(error.statusCode || statusCodes.serverError).json({
        success: false,
        message: error.message || statusMessages.serverError,
      });
    }
  }
}
