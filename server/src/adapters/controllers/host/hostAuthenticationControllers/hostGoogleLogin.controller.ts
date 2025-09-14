import { Request, Response } from "express";
import { IHostGoogleLoginController } from "../../../../domain/controllerInterfaces/hostControllerInterfaces/hostAuthenticationControllerInterfaces/interface.hostGoogleLoginController";
import { IHostGoogleLoginUseCase } from "../../../../domain/usecaseInterfaces/hostUsecaseInterfaces/hostAuthenticationUsecaseInterfaces/interface.hostGoogleLoginUseCase";
import { googleLoginHostDTO } from "../../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/baseUtilities/messages/constantResponses";
import logger from "../../../../utils/baseUtilities/messages/logger";
import { IHostGoogleLoginValidator } from "../../../../domain/validatorInterfaces/hostValidatorInterfaces/interface.hostGoogleLoginValidator";

export class HostGoogleLoginController implements IHostGoogleLoginController {
  constructor(
    private _googleLoginUseCase: IHostGoogleLoginUseCase,
    private _validator: IHostGoogleLoginValidator
  ) {}

  async googleLogin(req: Request, res: Response): Promise<void> {
    try {
      const loginData = req.body as googleLoginHostDTO;

      this._validator.validate(loginData);

      const { host, accessToken, refreshToken } =
        await this._googleLoginUseCase.hostGoogleLogin(loginData);

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
