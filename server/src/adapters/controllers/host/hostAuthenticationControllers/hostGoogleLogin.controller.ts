import { Request, Response } from "express";
import { IHostGoogleLoginController } from "../../../../domain/controlInterface/host/authentication controller interface/interface.hostGoogleLoginController";
import { IHostGoogleLoginUseCase } from "../../../../domain/usecaseInterface/host/authenticationUsecaseInterfaces/interface.hostGoogleLoginUseCase";
import { googleLoginHostDTO } from "../../../../types/DTO/host/dto.host";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import logger from "../../../../utils/common/messages/logger";
import { IHostGoogleLoginValidator } from "../../../../domain/validatorInterface/host/interface.hostGoogleLoginValidator";

export class HostGoogleLoginController implements IHostGoogleLoginController {
  constructor(
    private googleLoginUseCase: IHostGoogleLoginUseCase,
    private validator: IHostGoogleLoginValidator
  ) {}

  async googleLogin(req: Request, res: Response): Promise<void> {
    try {
      const loginData = req.body as googleLoginHostDTO;

      this.validator.validate(loginData);

      const { host, accessToken, refreshToken } =
        await this.googleLoginUseCase.hostGoogleLogin(loginData);

      res.status(statusCodes.Success).json({
        success: true,
        message: "Login with Google successfully",
        host,
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      logger.error("Google sign-in error:", error.message);

      if (error.response) {
        res.status(error.response.status).json({
          success: false,
          message: error.response.data.message,
        });
      } else if (error instanceof Error) {
        res.status(statusCodes.serverError).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(statusCodes.serverError).json({
          success: false,
          message: statusMessages.serverError,
        });
      }
    }
  }
}
