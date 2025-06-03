import { Request, Response } from "express";
import { LoginAdmin } from "../../../../application/use-cases/admin/Auth/loginAdmin";
import CustomError from "../../../../utils/CustomError";
import logger from "../../../../utils/logger";
export class AdminLoginController {
  constructor(private loginAdmin: LoginAdmin) {}

  async adminLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken, admin } =
        await this.loginAdmin.execute(email, password);
      res.status(200).json({
        success: true,
        message: "Admin logged in successfully",
        admin: {
          id: admin.id,
          firstname: admin.firstname,
          lastname: admin.lastname,
          phone: admin.phone,
          email: admin.email,
          role: admin.role,
          profilePic: admin.profilePic,
          isBlocked: admin.isBlocked,
          isActive: admin.isActive,
          timestamp: admin.timestamp,
          accessToken,
          refreshToken,
        },
      });
    } catch (error: any) {
      logger.error(error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }
}
