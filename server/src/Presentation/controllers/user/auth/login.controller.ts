import { Request, Response } from "express";
import { LoginUser } from "../../../../application/use-cases/user/Auth/loginUser";
import logger from "../../../../utils/common/messages/logger";
import CustomError from "../../../../utils/common/errors/CustomError";

export class LoginController {
  constructor(private loginUser: LoginUser) {}

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken, user } = await this.loginUser.execute(
        email,
        password
      );

      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          phone: user.phone,
          email: user.email,
          role: user.role,
          profilePic:user.profilePic,
          isBlocked:user.isBlocked,
          isActive:user.isActive,
          timestamp:user.timestamp
        },
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      logger.error("Login Error:", error);
    
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }
    
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
    
  }
}
