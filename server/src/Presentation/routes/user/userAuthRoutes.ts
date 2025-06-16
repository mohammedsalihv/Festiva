import express from "express";
import {
  userController,
  userSignupController,
  otpController,
  verifyOtpController,
  userLoginController,
  refreshTokenController,
  userGoogleLoginController,
  userLogoutController,
} from "../../../infrastructure/DI/user/userAuth.DI";
import { userProfileController } from "../../../infrastructure/DI/user/userAccount.DI";
import logger from "../../../utils/common/messages/logger";
import { authenticateToken } from "../../../utils/common/middlewares/auth";

const userAuthRoutes = express.Router();

userAuthRoutes.post(
  "/signup",
  userSignupController.signup.bind(userSignupController)
);
userAuthRoutes.post("/send-otp", async (req, res) => {
  try {
    await otpController.sendOTP(req, res);
  } catch (error) {
    logger.info(error);
  }
});
userAuthRoutes.post(
  "/verifyOtp",
  verifyOtpController.verifyOTP.bind(verifyOtpController)
);
userAuthRoutes.post("/login", async (req, res) => {
  try {
    await userLoginController.login(req, res);
  } catch (error) {
    logger.info(error);
  }
});
userAuthRoutes.post(
  "/refresh",
  refreshTokenController.refreshAccessToken.bind(refreshTokenController)
);
userAuthRoutes.post(
  "/google-login",
  userGoogleLoginController.login.bind(userGoogleLoginController)
);

userAuthRoutes.get(
  "/checkMail/:email",
  userProfileController.validateMail.bind(userProfileController)
);

userAuthRoutes.post(
  "/password/reset",
  userController.resetPassword.bind(userController)
);

userAuthRoutes.post(
  "/passwordModify",
  authenticateToken,
  userProfileController.passwordModify.bind(userProfileController)
);

userAuthRoutes.delete(
  "/profile/delete",
  authenticateToken,
  userProfileController.deleteProfile.bind(userProfileController)
);

userAuthRoutes.delete("/logout", async (req, res) => {
  try {
    await userLogoutController.logout(req, res);
  } catch (err) {
    console.error("Logout route error:", err);
  }
});

export default userAuthRoutes;
