import { Request, Response } from "express";
import { UserProfileUseCase } from "../../../../application/use-cases/user/profile/usecase.userProfile";
import logger from "../../../../utils/common/messages/logger";
import { JwtPayload } from "jsonwebtoken";
import { AuthRequest } from "../../../../domain/controlInterface/authType";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";

interface MulterRequest extends Request {
  file: Express.Multer.File;
  auth?: JwtPayload & { id: string; role?: string };
}

export class UserProfileController {
  constructor(private userProfileUseCase: UserProfileUseCase) {}

  async setProfilePic(req: MulterRequest, res: Response) {
    try {
      const userId = req.auth?.id;
      const image = req.file;

      if (!image) {
        return res.status(statusCodes.forbidden).json({
          success: false,
          message: "No image file uploaded.",
        });
      }

      if (!userId) {
        return res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "Unauthorized. No user ID found in request.",
        });
      }

      const updatedUser = await this.userProfileUseCase.execute(userId, image);

      res.status(statusCodes.Success).json({
        success: true,
        message: "Profile image changed!",
        data: {
          profilePhotoUrl: updatedUser.profilePic,
          ...updatedUser,
        },
      });
    } catch (error: any) {
      logger.error("Profile change Error:", error);

      if (error.message === "User not found") {
        return res.status(statusCodes.notfound).json({
          success: false,
          message: "User not found",
        });
      }
      res.status(statusCodes.serverError).json({
        success: false,
        message: error.message,
      });
    }
  }

  async profileEdit(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.auth?.id;
    const formData = req.body;
    if (!userId) {
      res.status(statusCodes.unAuthorized).json({
        success: false,
        message: "Missing userId",
      });
      return;
    }
    if (!formData) {
      res.status(statusCodes.forbidden).json({
        success: false,
        message: "Missing form data",
      });
      return;
    }
    try {
      const response = await this.userProfileUseCase.profileEdit(
        userId,
        formData
      );
      res.status(statusCodes.Success).json({
        message: "Profile updated!",
        success: true,
        data: response,
      });
    } catch (error) {
      logger.error(String(error), "Error updating profile");

      const statusCode = (error as any)?.statusCode || statusCodes.serverError;
      const message = (error as any)?.message || "Failed to update profile";

      res.status(statusCode).json({
        success: false,
        message,
      });
    }
  }

  async validateMail(req: AuthRequest, res: Response): Promise<void> {
    const { email } = req.params;
    if (!email) {
      res.status(statusCodes.unAuthorized).json({
        success: false,
        message: "Email is required",
      });
      return;
    }

    try {
      await this.userProfileUseCase.validateEmail(email);
      res.status(statusCodes.Success).json({
        success: true,
        message: "Email is available",
      });
    } catch (error) {
      const statusCode = (error as any)?.statusCode;
      const message = (error as any)?.message;

      res.status(statusCode).json({
        success: false,
        message: message || statusMessages.accountExisted,
      });
    }
  }

  async passwordModify(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.auth?.id;
    const formData = req.body;

    if (!userId) {
      res
        .status(statusCodes.unAuthorized)
        .json({ success: false, message: "Missing userId" });
      return;
    }

    if (!formData) {
      res
        .status(statusCodes.forbidden)
        .json({ success: false, message: "Missing form data" });
      return;
    }

    try {
      const response = await this.userProfileUseCase.passwordModify(
        userId,
        formData
      );
      res
        .status(statusCodes.Success)
        .json({ message: "Password changed!", success: true, data: response });
    } catch (error) {
      logger.error(String(error), "Error while changing password");
      const statusCode = (error as any)?.statusCode || statusCodes.serverError;
      const message = (error as any)?.message || statusMessages.serverError;
      res.status(statusCode).json({ success: false, message });
    }
  }

  async deleteProfile(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.auth?.id;

    if (!userId) {
      res.status(statusCodes.unAuthorized).json({
        success: false,
        message: "Missing or invalid userId",
      });
      return;
    }

    try {
      const isDeleted = await this.userProfileUseCase.deleteProfile(userId);

      if (!isDeleted) {
        res.status(statusCodes.notfound).json({
          success: false,
          message: "User not found or already deleted",
        });
        return;
      }

      res.status(statusCodes.Success).json({
        success: true,
        message: "User account deleted successfully",
      });
    } catch (error) {
      logger.error(String(error), "Error deleting user");
      res.status(statusCodes.serverError).json({
        success: false,
        message: "Error while deleting the account",
      });
    }
  }
}
