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
      res.status(500).json({
        success: false,
        message: "Failed to update profile",
      });
    }
  }
}
