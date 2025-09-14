import express from "express";
import { USER_ROUTES } from "../../../infrastructure/constants/user.routes";
import {
  userController,
  userSignupController,
  userLoginController,
  refreshTokenController,
  userGoogleLoginController,
  userLogoutController,
} from "../../../infrastructure/dependencyInjections/userDependencyInjections/userAuthenticationDependencyInjections/userAuth.DI";
import { otpController } from "../../../infrastructure/dependencyInjections/baseDependencyInjections/baseAuthenticationDependencyInjections/otp.DI";
import { userProfileController } from "../../../infrastructure/dependencyInjections/userDependencyInjections/userAccountDependencyInjections/userAccount.DI";
import logger from "../../../utils/baseUtilities/messages/logger";
import { authenticateToken } from "../../../utils/baseUtilities/middlewares/auth";

const userAuthenticationRoutes = express.Router();

userAuthenticationRoutes.post(USER_ROUTES.Authentiation.userLogin, async (req, res) => {
  try {
    await userLoginController.loginByUser(req, res);
  } catch (error) {
    logger.info(error);
  }
});

userAuthenticationRoutes.post(
  USER_ROUTES.Authentiation.userSignup,
  userSignupController.signupByUser.bind(userSignupController)
);

userAuthenticationRoutes.post(USER_ROUTES.Authentiation.sendOtp, async (req, res) => {
  try {
    await otpController.otpSending(req, res);
  } catch (error) {
    logger.info(error);
  }
});

userAuthenticationRoutes.post(
  USER_ROUTES.Authentiation.verifyOtp,
  otpController.otpVerification.bind(otpController)
);

userAuthenticationRoutes.post(
  USER_ROUTES.Authentiation.Refresh_Token,
  refreshTokenController.refreshAccessToken.bind(refreshTokenController)
);

userAuthenticationRoutes.post(
  USER_ROUTES.Authentiation.userGoogleLogin,
  userGoogleLoginController.userLogin.bind(userGoogleLoginController)
);

userAuthenticationRoutes.get(
  USER_ROUTES.Authentiation.mailValidate,
  userProfileController.validateMail.bind(userProfileController)
);

userAuthenticationRoutes.post(
  USER_ROUTES.Authentiation.passwordReset,
  userController.resetPassword.bind(userController)
);

userAuthenticationRoutes.post(
  USER_ROUTES.Authentiation.passwordChange,
  userProfileController.passwordModify.bind(userProfileController)
);

userAuthenticationRoutes.delete(
  USER_ROUTES.Authentiation.profileDelete,
  authenticateToken,
  userProfileController.deleteProfile.bind(userProfileController)
);

userAuthenticationRoutes.delete(
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

export default userAuthenticationRoutes;
