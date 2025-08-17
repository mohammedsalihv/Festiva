import { Request, Response } from "express";
import { IUserLogoutController } from "../../../../domain/controlInterface/user/userAuthenticationControllerInterfaces/interface.userLogoutController";
import { IUserLogoutUseCase } from "../../../../domain/usecaseInterface/user/userAuthenticationUseCaseInterfaces/interface.userLogoutUseCase";
import CustomError from "../../../../utils/common/errors/CustomError";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";

export class UserLogoutController implements IUserLogoutController {
  constructor(private _userLogoutUseCase: IUserLogoutUseCase) {}

  async userLogout(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(statusCodes.unAuthorized).json({
          success: false,
          message: statusMessages.noToken,
        });
      }

      await this._userLogoutUseCase.logout(token);
      return res.status(statusCodes.Success).json({
        success: true,
        message: statusMessages.userLoginSuccess,
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
