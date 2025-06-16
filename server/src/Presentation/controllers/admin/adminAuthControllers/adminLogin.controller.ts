import { Request, Response } from "express";
import { AdminLoginUsecase } from "../../../../application/use-cases/admin/adminAuthentication/usecase.adminLogin";
import CustomError from "../../../../utils/common/errors/CustomError";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
export class AdminLoginController {
  constructor(private AdminLoginUsecase: AdminLoginUsecase) {}

  async adminLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken, admin } =
        await this.AdminLoginUsecase.execute(email, password);
      res.status(statusCodes.Success).json({
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
      return res.status(statusCodes.serverError).json({
        success: false,
        message: error.message || statusMessages.serverError,
      });
    }
  }
}
