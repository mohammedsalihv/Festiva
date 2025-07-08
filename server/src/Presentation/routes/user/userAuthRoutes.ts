import express from "express";
import { USER_ROUTES } from "../../../infrastructure/constants/user.routes";
import {
  userController,
  userSignupController,
  otpController,
  verifyOtpController,
  userLoginController,
  refreshTokenController,
  userGoogleLoginController,
  userLogoutController,
} from "../../../infrastructure/DI/user/authentication/userAuth.DI";
import { userProfileController } from "../../../infrastructure/DI/user/account/userAccount.DI";
import logger from "../../../utils/common/messages/logger";
import { authenticateToken } from "../../../utils/common/middlewares/auth";

const userAuthRoutes = express.Router();

userAuthRoutes.post(USER_ROUTES.Authentiation.userLogin, async (req, res) => {
  try {
    await userLoginController.login(req, res);
  } catch (error) {
    logger.info(error);
  }
});

userAuthRoutes.post(
  USER_ROUTES.Authentiation.userSignup,
  userSignupController.signup.bind(userSignupController)
);
userAuthRoutes.post(USER_ROUTES.Authentiation.sendOtp, async (req, res) => {
  try {
    await otpController.sendOTP(req, res);
  } catch (error) {
    logger.info(error);
  }
});
userAuthRoutes.post(
  USER_ROUTES.Authentiation.verifyOtp,
  verifyOtpController.verifyOTP.bind(verifyOtpController)
);

userAuthRoutes.post(
  USER_ROUTES.Authentiation.Refresh_Token,
  refreshTokenController.refreshAccessToken.bind(refreshTokenController)
);
userAuthRoutes.post(
  USER_ROUTES.Authentiation.userGoogleLogin,
  userGoogleLoginController.login.bind(userGoogleLoginController)
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
  async (req, res) => {
    try {
      await userLogoutController.logout(req, res);
    } catch (err) {
      logger.error(err);
    }
  }
);

export default userAuthRoutes;
