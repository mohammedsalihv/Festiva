import { Request, Response } from "express";
import { UserLogoutUseCase } from "../../../../application/use-cases/user/authentication/usecase.userLogout";
import CustomError from "../../../../utils/common/errors/CustomError";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";

export class UserLogoutController {
  constructor(private UserLogoutUseCase: UserLogoutUseCase) {}

  async logout(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "Token is required",
        });
        return;
      }

      await this.UserLogoutUseCase.execute(token);
      res.status(statusCodes.Success).json({
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

      res.status(statusCodes.serverError).json({
        success: false,
        message: statusMessages.serverError,
      });
    }
  }
}
