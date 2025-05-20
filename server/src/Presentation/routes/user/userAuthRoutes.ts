import express from "express";
import { userController , otpController , verifyOtpController , loginController , refreshTokenController , googleController } from "../../../infrastructure/frameworks/DependencyInjection/user/Auth.dependancyContainer";
import logger from "../../../utils/logger";

const userAuthRoutes = express.Router();

userAuthRoutes.post("/signup", async (req, res) => {
  try {
    await userController.register(req, res);
  } catch (error) {
    logger.info(error);
  }
});

userAuthRoutes.post("/send-otp", async (req, res) => {
  try {
    await otpController.sendOTP(req, res);
  } catch (error) {
    logger.info(error);
  }
});

userAuthRoutes.post("/verify_otp", async (req, res) => {
  try {
    await verifyOtpController.verifyOTP(req, res);
  } catch (error) {
    logger.info(error);
  }
});

userAuthRoutes.post("/login", async (req, res) => {
  try {
    await loginController.login(req, res);
  } catch (error) {
    logger.info(error);
  }
});

userAuthRoutes.post("/refresh", async (req, res) => {
  try {
    await refreshTokenController.refreshAccessToken(req, res);
  } catch (error) {
    logger.info(error);
  }
});


userAuthRoutes.post("/google-login", async (req, res) => {
  try {
    await googleController.login(req, res);
  } catch (error) {
    logger.info(error);
  }
});


export default userAuthRoutes;
