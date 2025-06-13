import express, { Request, Response } from "express";
import logger from "../../../utils/common/messages/logger";
import { userProfileController } from "../../../infrastructure/DI/user/account.dependancyContainer";
import { singleImageUpload } from "../../../utils/common/middlewares/multer";
import { authenticateToken } from "../../../utils/common/middlewares/auth";


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
      await userProfileController.setProfilePic(req as MulterRequest, res);
    } catch (error) {
      logger.info(error);
      res.status(500).json({
        message: "An error occurred while changing the profile",
      });
    }
  }
);

userRoutes.post("/profileModify", authenticateToken , userProfileController.profileEdit.bind(userProfileController));




export default userRoutes;
