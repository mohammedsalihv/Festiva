import { Request, Response } from "express";
import { UserProfile } from "../../../../application/use-cases/user/Pages/Profile/changeProfile-usecase";
import logger from "../../../../utils/logger";


interface MulterRequest extends Request {
  file: Express.Multer.File;
}

export class UserProfileController {
  constructor(private changeProfileUseCase: UserProfile) {}

  async changeProfile(req: MulterRequest, res: Response) {
    try {
      const userId = req.params.id;
      const image = req.file; 

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized. No user ID found in request.",
        });
      }

      await this.changeProfileUseCase.execute(userId, image);

      res.status(200).json({
        success: true,
        message: "Profile image changed!",
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
}
