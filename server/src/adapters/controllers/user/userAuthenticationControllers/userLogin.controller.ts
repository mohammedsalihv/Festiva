import { Request, Response } from "express";
import { IUserLoginController } from "../../../../domain/controlInterface/user/userAuthenticationControllerInterfaces/interface.userLoginController";
import { IUserLoginUseCase } from "../../../../domain/usecaseInterface/user/userAuthenticationUseCaseInterfaces/interface.userLoginUseCase";
import logger from "../../../../utils/common/messages/logger";
import CustomError from "../../../../utils/common/errors/CustomError";
import { userLoginSanitizer } from "../../../../utils/sanitizers/user/userLoginSanitizer";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import { IUserModel } from "../../../../domain/entities/modelInterface/user/interface.user";

export class UserLoginController implements IUserLoginController {
  constructor(private userLoginUseCase: IUserLoginUseCase) {}

  async loginByUser(req: Request, res: Response): Promise<Response | void> {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken, user } =
        await this.userLoginUseCase.userLogin(email, password);

      res.status(statusCodes.Success).json({
        success: true,
        message: statusMessages.userLoginSuccess,
        user: userLoginSanitizer.toUserLoginResponse(user as IUserModel),
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      logger.error(statusMessages.loginError, error);

      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(statusCodes.serverError).json({
        success: false,
        message: statusMessages.serverError,
      });
    }
  }
}
