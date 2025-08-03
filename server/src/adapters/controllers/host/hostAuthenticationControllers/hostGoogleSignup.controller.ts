import { Request, Response } from "express";
import { IHostGoogleSignupController } from "../../../../domain/controlInterface/host/authentication controller interface/interface.hostGoogleSignupController";
import { IHostGoogleSignupUseCase } from "../../../../domain/usecaseInterface/host/authenticationUsecaseInterfaces/interface.hostGoogleSignupUseCase";
import { googleSignupHostDTO } from "../../../../types/DTO/user/dto.hostGoogleSignup";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import logger from "../../../../utils/common/messages/logger";
import { IHostGoogleSignupValidator } from "../../../../domain/validatorInterface/host/interface.hostGoogleSignupValidator";

export class HostGoogleSignupController implements IHostGoogleSignupController {
  constructor(
    private googleSignupUseCase: IHostGoogleSignupUseCase,
    private validator: IHostGoogleSignupValidator
  ) {}

  async googleSignup(req: Request, res: Response): Promise<void> {
    try {
      const signupData = req.body as googleSignupHostDTO;

      this.validator.validate(signupData);

      const { host, accessToken, refreshToken } =
        await this.googleSignupUseCase.hostGoogleSignup(signupData);

      res.status(statusCodes.Success).json({
        success: true,
        message: "Registered with Google successfully",
        host,
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      logger.error("Google signup error:", error.message);

      if (error.response) {
        res.status(error.response.status).json({
          success: false,
          message: error.response.data.message,
        });
        return;
      }

      if (error instanceof Error) {
        res.status(statusCodes.serverError).json({
          success: false,
          message: error.message,
        });
        return;
      }

      res.status(statusCodes.serverError).json({
        success: false,
        message: statusMessages.serverError,
      });
    }
  }
}
