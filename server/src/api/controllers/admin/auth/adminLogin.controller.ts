import { Request, Response } from "express";
import { LoginAdmin } from "../../../../application/use-cases/admin/Auth/loginAdmin";
export class AdminLoginController {
  constructor(private loginAdmin: LoginAdmin) {}

  async adminLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken, admin } = await this.loginAdmin.execute(
        email,
        password
      );
      res.status(200).json({
        success: true,
        message: "Admin logged in successfully",
        admin: {
          id: admin.id,
          firstname: admin.firstname,
          lastname:admin.lastname,
          phone:admin.phone,
          email: admin.email,
          role: "admin",
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

      if (error.message === "Admin not found") {
        return res.status(404).json({
          success: false,
          message: "admin not authrized",
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
