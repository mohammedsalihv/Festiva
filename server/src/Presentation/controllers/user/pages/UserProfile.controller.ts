import { Request, Response } from "express";
import { UserProfile } from "../../../../application/use-cases/user/Pages/Profile/userProfile-usecase";
import logger from "../../../../utils/logger";
import { JwtPayload } from "jsonwebtoken";
import { AuthRequest } from "../../../../domain/entities/controlInterface/authType";

interface MulterRequest extends Request {
  file: Express.Multer.File;
  auth?: JwtPayload & { id: string; role?: string };
}

export class UserProfileController {
  constructor(private userProfileUseCase: UserProfile) {}

  async setProfilePic(req: MulterRequest, res: Response) {
    try {
      const userId = req.auth?.id;
      const image = req.file;

      if (!image) {
        return res.status(400).json({
          success: false,
          message: "No image file uploaded.",
        });
      }

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized. No user ID found in request.",
        });
      }

      const updatedUser = await this.userProfileUseCase.execute(userId, image);

      res.status(200).json({
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
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }

  async profileEdit(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.auth?.id;
    const formData = req.body;
    if (!userId) {
      res.status(400).json({
        success: false,
        message: "Missing userId",
      });
      return;
    }
    if (!formData) {
      res.status(400).json({
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
      res.status(200).json({
        message: "Profile updated!",
        success: true,
        data: response,
      });
    } catch (error) {
      logger.error(String(error), "Error updating profile");

      const statusCode = (error as any)?.statusCode || 500;
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
      res.status(400).json({
        success: false,
        message: "Email is required",
      });
      return;
    }

    try {
      await this.userProfileUseCase.validateEmail(email);
      res.status(200).json({
        success: true,
        message: "Email is available",
      });
    } catch (error) {
      const statusCode = (error as any)?.statusCode;
      const message = (error as any)?.message;

      res.status(statusCode).json({
        success: false,
        message: message || "Email already registered",
      });
    }
  }

  async passwordModify(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.auth?.id;
    const formData = req.body;

    if (!userId) {
      res.status(400).json({ success: false, message: "Missing userId" });
      return;
    }

    if (!formData) {
      res.status(400).json({ success: false, message: "Missing form data" });
      return;
    }

    try {
      const response = await this.userProfileUseCase.passwordModify(
        userId,
        formData
      );
      res
        .status(200)
        .json({ message: "Password changed!", success: true, data: response });
    } catch (error) {
      logger.error(String(error), "Error while changing password");
      const statusCode = (error as any)?.statusCode || 500;
      const message = (error as any)?.message || "Internal server error";
      res.status(statusCode).json({ success: false, message });
    }
  }

  async deleteProfile(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.auth?.id;

    if (!userId) {
      res.status(400).json({
        success: false,
        message: "Missing or invalid userId",
      });
      return;
    }

    try {
      const isDeleted = await this.userProfileUseCase.deleteProfile(userId);

      if (!isDeleted) {
        res.status(404).json({
          success: false,
          message: "User not found or already deleted",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "User account deleted successfully",
      });
    } catch (error) {
      logger.error(String(error), "Error deleting user");
      res.status(500).json({
        success: false,
        message: "Error while deleting the account",
      });
    }
  }
}
