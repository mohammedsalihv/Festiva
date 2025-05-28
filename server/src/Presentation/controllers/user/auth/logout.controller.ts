import { Request, Response } from "express";
import { LogoutUser } from "../../../../application/use-cases/user/Auth/logoutUser";
import { LogoutRepository } from "../../../../infrastructure/repositories/user/auth/repository.userLogout";
import CustomError from "../../../../utils/CustomError";
import logger from "../../../../utils/logger";

export class LogoutController {
  constructor(private logoutUser: LogoutUser) {}

  async logout(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        throw new CustomError("Token not provided", 400);
      }

      await this.logoutUser.execute(token);

      res.status(200).json({
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

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}
