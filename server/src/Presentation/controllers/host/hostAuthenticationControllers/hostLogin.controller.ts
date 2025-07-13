import { Request, Response } from "express";
import { HostLoginUseCase } from "../../../../application/use-cases/host/hostAuthentication/usecase.hostLogin";
import logger from "../../../../utils/common/messages/logger";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class HostLoginController {
  constructor(private HostLogin: HostLoginUseCase) {}

  async hostLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken, host } = await this.HostLogin.execute(
        email,
        password
      );
      res.status(statusCodes.Success).json({
        success: true,
        message: "Host logged in successfully",
        host: {
          id: host.id,
          name: host.name,
          email: host.email,
          phone:host.phone,
          profilePic:host.profilePic,
          role: "host",
          accessToken,
          refreshToken,
        },
      });
    } catch (error: any) {
      logger.error("Login Error:", error);
      if (error.message === "Invalid credentials") {
        return res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      if (error.message === "Host not found") {
        return res.status(statusCodes.notfound).json({
          success: false,
          message: "User not found",
        });
      }

      if (error.name === "ValidationError") {
        return res.status(statusCodes.unAuthorized).json({
          success: false,
          message: error.message,
        });
      }

      res.status(statusCodes.serverError).json({
        success: false,
        message: error.message,
      });
    }
  }
}
