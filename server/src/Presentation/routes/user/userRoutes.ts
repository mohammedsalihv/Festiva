import express, { Request, Response } from "express";
import { USER_ROUTES } from "../../../infrastructure/constants/user.routes";
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
  USER_ROUTES.UserAccount.setProfilePhoto,
  authenticateToken,
  singleImageUpload,
  async (req, res) => {
    try {
      await userProfileController.setProfilePic(req as MulterRequest, res);
    } catch (error) {
      logger.info(error);
    }
  }
);

userRoutes.post(
  USER_ROUTES.UserAccount.profileEdit,
  authenticateToken,
  userProfileController.profileEdit.bind(userProfileController)
);

// venues

userRoutes.get(
  USER_ROUTES.VenueService.allVenues,
  userVenueController.getVenues.bind(userVenueController)
);

// rentcar

userRoutes.get(
  USER_ROUTES.RentcarService.allRentcars,
  userRentCarController.getRentCars.bind(userRentCarController)
);

// caters
userRoutes.get(
  USER_ROUTES.CatersService.allCaters,
  userCatersController.getCaters.bind(userCatersController)
);

// studio
userRoutes.get(
  USER_ROUTES.StudioService.allStudios,
  userStudioController.getStudios.bind(userStudioController)
);

export default userRoutes;
