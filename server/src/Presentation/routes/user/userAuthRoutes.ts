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

  userAuthRoutes.post("/signup", userController.register.bind(userController));
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

  export default userAuthRoutes;
