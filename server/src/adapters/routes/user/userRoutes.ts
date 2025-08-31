import express, { Request, Response } from "express";
import { USER_ROUTES } from "../../../infrastructure/constants/user.routes";
import logger from "../../../utils/common/messages/logger";
import { userProfileController } from "../../../infrastructure/DI/user/userAccountDependencyInjections/userAccount.DI";
import { singleImageUpload } from "../../../utils/common/middlewares/multer";
import { authenticateToken } from "../../../utils/common/middlewares/auth";
import { userVenueController } from "../../../infrastructure/DI/user/userServiceDependencyInjections/userVenue.DI";
import { userRentCarController } from "../../../infrastructure/DI/user/userServiceDependencyInjections/userRentCar.DI";
import { userStudioController } from "../../../infrastructure/DI/user/userServiceDependencyInjections/userStudio.DI";
import { userCatersController } from "../../../infrastructure/DI/user/userServiceDependencyInjections/userCaters.DI";
import { userController } from "../../../infrastructure/DI/user/userAuthenticationDependencyInjections/userAuth.DI";
import { paymentController } from "../../../infrastructure/DI/base/paymentDependencyInjections/payment.DI";
import { bookingController } from "../../../infrastructure/DI/base/bookingDependencyInjections/booking.DI";
import { reviewController } from "../../../infrastructure/DI/base/reviewDependencyInjections/review.DI";
import { userBookingsController } from "../../../infrastructure/DI/user/userAccountDependencyInjections/userBookings.DI";


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


userRoutes.get(
  USER_ROUTES.UserAccount.getProfileImage, 
  authenticateToken, 
  userController.profileImage.bind(userController)
);


// venues

userRoutes.get(
  USER_ROUTES.VenueService.allVenues,
  authenticateToken,
  userVenueController.getVenues.bind(userVenueController)
);

// rentcar

userRoutes.get(
  USER_ROUTES.RentcarService.allRentcars,
  authenticateToken,
  userRentCarController.getRentCars.bind(userRentCarController)
);

// caters
userRoutes.get(
  USER_ROUTES.CatersService.allCaters,
  authenticateToken,
  userCatersController.getCaters.bind(userCatersController)
);

// studio
userRoutes.get(
  USER_ROUTES.StudioService.allStudios,
  authenticateToken,
  userStudioController.getStudios.bind(userStudioController)
);


// booking

userRoutes.post(
  USER_ROUTES.bookingRoutes.createbooking,
  authenticateToken,
  bookingController.createBooking.bind(bookingController)
);

userRoutes.get(
  USER_ROUTES.bookingRoutes.allBookings,
  authenticateToken,
  userBookingsController.getMyBookings.bind(userBookingsController)
);


// payment 
userRoutes.post(
  USER_ROUTES.paymentRoutes.startPayment,
  authenticateToken,
  paymentController.startPayment.bind(paymentController)
);

userRoutes.put(
  USER_ROUTES.paymentRoutes.statusUpdate,
  authenticateToken,
  paymentController.paymentStatusUpdate.bind(paymentController)
);


// review 

userRoutes.post(
  USER_ROUTES.reviewRoutes.addNewReview,
  authenticateToken,
  reviewController.addReview.bind(reviewController)
);


export default userRoutes;
