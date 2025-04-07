import express from "express";
import {
  userController,
  otpController,
  verifyOtpController,
  loginController,
  googleController
} from "../../infrastructure/frameworks/DependencyInjection/user/Auth.dependancyContainer";

const userRoutes = express.Router();

userRoutes.post("/signup", async (req, res) => {
  try {
    await userController.register(req, res);
  } catch (error) {
    console.log(error);
  }
});

userRoutes.post("/send-otp", async (req, res) => {
  try {
    await otpController.sendOTP(req, res);
  } catch (error) {
    console.log(error);
  }
});

userRoutes.post("/verify_otp", async (req, res) => {
  try {
    await verifyOtpController.verifyOTP(req, res);
  } catch (error) {
    console.log(error);
  }
});

userRoutes.post("/login", async (req, res) => {
  try {
    await loginController.login(req, res);
  } catch (error) {
    console.log(error);
  }
});


userRoutes.post("/google-login", async (req, res) => {
  try {
    await googleController.login(req, res);
  } catch (error) {
    console.log(error);
  }
});


export default userRoutes;
