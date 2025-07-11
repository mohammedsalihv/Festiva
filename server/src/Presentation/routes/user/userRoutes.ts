import express, { Request, Response } from "express";
import logger from "../../../utils/common/messages/logger";
import { userProfileController } from "../../../infrastructure/DI/user/account/userAccount.DI";
import { singleImageUpload } from "../../../utils/common/middlewares/multer";
import { authenticateToken } from "../../../utils/common/middlewares/auth";
import { userVenueController } from "../../../infrastructure/DI/user/services/userVenue.DI";
import { userRentCarController } from "../../../infrastructure/DI/user/services/userRentCar.DI";
import { userStudioController } from "../../../infrastructure/DI/user/services/userStudio.DI";
import { userCatersController } from "../../../infrastructure/DI/user/services/userCaters.DI";

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

userRoutes.post(
  "/profileModify",
  authenticateToken,
  userProfileController.profileEdit.bind(userProfileController)
);




// base api


// venues

userRoutes.get(
  "/getVenues",
  userVenueController.getVenues.bind(userVenueController)
);

// rentcar

userRoutes.get(
  "/getRentcars",
  userRentCarController.getRentCars.bind(userRentCarController)
);

// caters
userRoutes.get(
  "/getCaters",
  userCatersController.getCaters.bind(userCatersController)
);


// studio
userRoutes.get(
  "/getStudios",
  userStudioController.getStudios.bind(userStudioController)
);

export default userRoutes;
