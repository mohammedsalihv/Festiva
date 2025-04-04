import express from "express";
import {
  userController,
  otpController,
  verifyOtpController,
  loginController,
  googleController
} from "../../infrastructure/frameworks/DependencyInjection/user/Auth.dependancyContainer";

const userRoutes = express.Router();

userRoutes.post("/signup", async (req, res, next) => {
  try {
    await userController.register(req, res, next);
  } catch (error) {
    next(error);
  }
});

userRoutes.post("/send-otp", async (req, res, next) => {
  try {
    await otpController.sendOTP(req, res, next);
  } catch (error) {
    next(error);
  }
});

userRoutes.post("/verify_otp", async (req, res, next) => {
  try {
    await verifyOtpController.verifyOTP(req, res, next);
  } catch (error) {
    next(error);
  }
});

userRoutes.post("/login", async (req, res, next) => {
  try {
    await loginController.login(req, res, next);
  } catch (error) {
    next(error);
  }
});


userRoutes.post("/google-login", async (req, res, next) => {
  try {
    await googleController.login(req, res, next);
  } catch (error) {
    next(error);
  }
});


export default userRoutes;
