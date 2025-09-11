import { Request, Response } from "express";
import { IAdminLogoutController } from "../../../../domain/controlInterface/admin/authentications/interface.adminLogoutController";
import { IAdminLogoutUseCase } from "../../../../domain/usecaseInterface/admin/authenticationUsecaseInterfaces/interface.adminLogoutUseCase";
import CustomError from "../../../../utils/common/errors/CustomError";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import { authenticationRequest } from "../../../../domain/controlInterface/common/authentication/authRequest";

export class AdminLogoutController implements IAdminLogoutController {
  constructor(private _adminLogoutUseCase: IAdminLogoutUseCase) {}

  async logoutByAdmin(
    req: authenticationRequest,
    res: Response
  ): Promise<Response> {
    try {
      const adminId = req.auth!.id;
      if (!adminId) {
        return res
          .status(statusCodes.forbidden)
          .json(statusMessages.unAuthorized);
      }

      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(statusCodes.unAuthorized).json({
          success: false,
          message: statusMessages.noToken,
        });
      }

      await this._adminLogoutUseCase.adminLogout(token);
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
