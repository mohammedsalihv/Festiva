import { Request, Response } from "express";
import { LoginUser } from "../../../../application/use-cases/user/Auth/loginUser";

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
          email: user.email,
          role: user.role,
        },
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      console.error("Login Error:", error);

      if (error.message === "Invalid credentials") {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      if (error.message === "User not found") {
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
