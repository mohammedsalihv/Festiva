import express from "express";
import {
  userController,
  otpController,
  verifyOtpController,
  loginController,
  refreshTokenController,
  googleController,
} from "../../../infrastructure/frameworks/DependencyInjection/user/Auth.dependancyContainer";
import logger from "../../../utils/logger";

const userAuthRoutes = express.Router();

userAuthRoutes.post("/signup", userController.register);
userAuthRoutes.post("/send-otp", async (req, res) => {
  try {
    await otpController.sendOTP(req, res);
  } catch (error) {
    logger.info(error);
  }
});
userAuthRoutes.post("/verify_otp", verifyOtpController.verifyOTP);
userAuthRoutes.post("/login", async (req, res) => {
  try {
    await loginController.login(req, res);
  } catch (error) {
    logger.info(error);
  }
});
userAuthRoutes.post("/refresh", refreshTokenController.refreshAccessToken);
userAuthRoutes.post("/google-login", googleController.login);

export default userAuthRoutes;
