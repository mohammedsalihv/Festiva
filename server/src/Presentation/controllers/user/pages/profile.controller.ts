import { Request, Response } from "express";
import { ProfileDataUseCase } from "../../../../application/use-cases/user/Pages/profilePage";
import logger from "../../../../utils/logger";

export class ProfileController {
  constructor(private profileDataUseCase: ProfileDataUseCase) {}

  async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized. No user ID found in request.",
        });
      }

      const { accessToken, refreshToken, user } = await this.profileDataUseCase.execute(userId);

      res.status(200).json({
        success: true,
        message: "User profile fetched successfully",
        user,
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      logger.error("Profile Fetch Error:", error);

      if (error.message === "User not found") {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (error.message === "User is blocked. Please contact support.") {
        return res.status(403).json({
          success: false,
          message: "User is blocked. Please contact support.",
        });
      }

      res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }
}