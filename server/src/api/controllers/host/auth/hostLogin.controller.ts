import { Request, Response } from "express";
import { LoginHost } from "../../../../application/use-cases/host/Auth/loginHost";

export class HostLoginController {
  constructor(private loginHost: LoginHost) {}

  async hostLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken, host } = await this.loginHost.execute(
        email,
        password
      );
      res.status(200).json({
        success: true,
        message: "Host logged in successfully",
        host: {
          id: host.id,
          name: host.name,
          email: host.email,
          role: host.role,
          accessToken,
          refreshToken,
        },
      });
    } catch (error: any) {
      console.error("Login Error:", error);
      if (error.message === "Invalid credentials") {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      if (error.message === "Host not found") {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (error.name === "ValidationError") {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }
}
