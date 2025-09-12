import express from "express";
import { USER_ROUTES } from "../../../infrastructure/constants/user.routes";
import {
  userController,
  userSignupController,
  userLoginController,
  refreshTokenController,
  userGoogleLoginController,
  userLogoutController,
} from "../../../infrastructure/DI/user/userAuthenticationDependencyInjections/userAuth.DI";
import { otpController } from "../../../infrastructure/DI/base/baseAuthenticationDependencyInjections/otp.DI";
import { userProfileController } from "../../../infrastructure/DI/user/userAccountDependencyInjections/userAccount.DI";
import logger from "../../../utils/baseUtilities/messages/logger";
import { authenticateToken } from "../../../utils/baseUtilities/middlewares/auth";

const userAuthRoutes = express.Router();

userAuthRoutes.post(USER_ROUTES.Authentiation.userLogin, async (req, res) => {
  try {
    await userLoginController.loginByUser(req, res);
  } catch (error) {
    logger.info(error);
  }
});

userAuthRoutes.post(
  USER_ROUTES.Authentiation.userSignup,
  userSignupController.signupByUser.bind(userSignupController)
);

userAuthRoutes.post(USER_ROUTES.Authentiation.sendOtp, async (req, res) => {
  try {
    await otpController.otpSending(req, res);
  } catch (error) {
    logger.info(error);
  }
});

userAuthRoutes.post(
  USER_ROUTES.Authentiation.verifyOtp,
  otpController.otpVerification.bind(otpController)
);

userAuthRoutes.post(
  USER_ROUTES.Authentiation.Refresh_Token,
  refreshTokenController.refreshAccessToken.bind(refreshTokenController)
);

userAuthRoutes.post(
  USER_ROUTES.Authentiation.userGoogleLogin,
  userGoogleLoginController.userLogin.bind(userGoogleLoginController)
);

userAuthRoutes.get(
  USER_ROUTES.Authentiation.mailValidate,
  userProfileController.validateMail.bind(userProfileController)
);

userAuthRoutes.post(
  USER_ROUTES.Authentiation.passwordReset,
  userController.resetPassword.bind(userController)
);

userAuthRoutes.post(
  USER_ROUTES.Authentiation.passwordChange,
  authenticateToken,
  userProfileController.passwordModify.bind(userProfileController)
);

userAuthRoutes.delete(
  USER_ROUTES.Authentiation.profileDelete,
  authenticateToken,
  userProfileController.deleteProfile.bind(userProfileController)
);

userAuthRoutes.delete(
  USER_ROUTES.Authentiation.userLogout,
  authenticateToken,
  async (req, res) => {
    try {
      await userLogoutController.userLogout(req, res);
    } catch (err) {
      logger.error(err);
    }
  }
);

export default userAuthRoutes;
