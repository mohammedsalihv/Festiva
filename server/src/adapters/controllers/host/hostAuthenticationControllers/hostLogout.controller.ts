import { Request, Response } from "express";
import { IHostLogoutController } from "../../../../domain/controlInterface/host/authentication controller interface/interface.hostLogout";
import { IHostLogoutUseCase } from "../../../../domain/usecaseInterface/host/authenticationUsecaseInterfaces/interface.hostLogoutUseCase";
import CustomError from "../../../../utils/common/errors/CustomError";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";

export class HostLogoutController implements IHostLogoutController {
  constructor(private _userLogoutUseCase: IHostLogoutUseCase) {}

  async hostLogout(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "Token is required",
        });
      }

      await this._userLogoutUseCase.logout(token);
      return res.status(statusCodes.Success).json({
        success: true,
        message: "Logout successful. Token blacklisted.",
      });
    } catch (error: any) {
      logger.error("Logout Error:", error);

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
