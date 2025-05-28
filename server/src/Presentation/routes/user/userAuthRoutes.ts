import express from "express";
import {
  userController,
  userRegisterController,
  otpController,
  verifyOtpController,
  loginController,
  refreshTokenController,
  googleController,
} from "../../../infrastructure/frameworks/DependencyInjection/user/Auth.dependancyContainer";
import { userProfileController } from "../../../infrastructure/frameworks/DependencyInjection/user/page.dependancyContainer";
import logger from "../../../utils/logger";
import { authenticateToken } from "../../../middlewares/auth";

const userAuthRoutes = express.Router();

userAuthRoutes.post(
  "/signup",
  userRegisterController.register.bind(userRegisterController)
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
    await loginController.login(req, res);
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
  googleController.login.bind(googleController)
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

userAuthRoutes.post("/logout", async (req, res) => {
  try {
    await logoutController.logout(req, res);
  } catch (err) {
    console.error("Logout route error:", err);
  }
});
export default userAuthRoutes;
