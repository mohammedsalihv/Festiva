import { Request, Response } from "express";
import { IAdminLoginController } from "../../../../domain/controllerInterfaces/adminControllerInterfaces/adminAuthenticationControllerInterfaces/interface.adminLoginController";
import { IAdminLoginUseCase } from "../../../../domain/usecaseInterfaces/adminUsecaseInterfaces/adminAuthenticationUsecaseInterfaces/interface.adminLoginUseCase";
import { adminLoginPresenter } from "../../../presenters/admin/adminLoginPresenter";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";
import logger from "../../../../utils/baseUtilities/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/baseUtilities/messages/constantResponses";

export class AdminLoginController implements IAdminLoginController {
  constructor(private _adminLoginUsecase: IAdminLoginUseCase) {}

  async adminLogin(req: Request, res: Response): Promise<Response | void> {
    try {
      const { email, password } = req.body;

      const { accessToken, refreshToken, admin } =
        await this._adminLoginUsecase.loginByadmin(email, password);

      const formattedResponse = adminLoginPresenter.format(
        admin,
        accessToken,
        refreshToken
      );

      return res.status(statusCodes.Success).json({
        success: true,
        message: "Admin logged in successfully",
        admin: formattedResponse,
      });
    } catch (error: any) {
      logger.error(error);

      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(statusCodes.serverError).json({
        success: false,
        message: error.message || statusMessages.serverError,
      });
    }
  }
}
