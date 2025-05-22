import express, { Request, Response } from "express";
import logger from "../../../utils/logger";
import { userProfileController } from "../../../infrastructure/frameworks/DependencyInjection/user/page.dependancyContainer";
import { singleImageUpload } from "../../../middlewares/multer";
import { authenticateToken } from "../../../middlewares/auth";

export interface MulterRequest extends Request {
  file: Express.Multer.File;
}

const userRoutes = express.Router();

userRoutes.put(
  "/setProfilePhoto",
  authenticateToken,
  singleImageUpload,
  async (req, res) => {
    try {
      await userProfileController.updateProfilePicture(req as MulterRequest, res);
    } catch (error) {
      logger.info(error);
      res.status(500).json({
        message: "An error occurred while changing the profile",
      });
    }
  }
);



export default userRoutes;
