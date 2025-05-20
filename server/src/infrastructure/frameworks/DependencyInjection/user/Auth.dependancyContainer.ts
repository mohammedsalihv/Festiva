// controllers

import { UserController } from "../../../../Presentation/controllers/user/auth/user.controller";
import { OTPController } from "../../../../Presentation/controllers/user/auth/otp.controller";
import { VerifyOtpController } from "../../../../Presentation/controllers/user/auth/verifyOtp.controller";
import { RefreshTokenController } from "../../../../Presentation/controllers/user/auth/refreshToken.controller";
import { LoginController } from "../../../../Presentation/controllers/user/auth/login.controller";
import { GoogleController } from "../../../../Presentation/controllers/user/auth/google.controller";

//use-cases

import { RegisterUser } from "../../../../application/use-cases/user/Auth/registerUser";
import { VerifyOtp } from "../../../../application/use-cases/user/Auth/verifyOtp";
import { SendOTP } from "../../../../application/use-cases/user/Auth/sentOtp";
import { LoginUser } from "../../../../application/use-cases/user/Auth/loginUser";
import { GoogleLogin } from "../../../../application/use-cases/user/Auth/googleLogin";

//repositories

import { UserRegisterRepository } from "../../../repositories/user/auth/userRegister.repository";
import { OTPRepository } from "../../../repositories/user/auth/otp.repository";
import { OTPrepository } from "../../../repositories/user/auth/verifyOtp.repository";
import { LoginRepository } from "../../../repositories/user/auth/login.repository";
import { GoogleAuthRepository } from "../../../repositories/user/auth/google.repository";






// Instantiating Repositories

const userRegisterRepository = new UserRegisterRepository();
const otpRepository = new OTPRepository();
const loginRepository = new LoginRepository();
const verifyOtpRepository = new OTPrepository();
const googleAuthRepository = new GoogleAuthRepository();

// Instantiate use cases
const registerUser = new RegisterUser(userRegisterRepository);
const SendOTPUseCase = new SendOTP(otpRepository);
const loginUser = new LoginUser(loginRepository);
const verifyOtp = new VerifyOtp(verifyOtpRepository);
const googleLoginUseCase = new GoogleLogin(googleAuthRepository);

// Instantiate controllers
const userController = new UserController(registerUser);
const otpController = new OTPController(SendOTPUseCase);
const loginController = new LoginController(loginUser);
const refreshTokenController = new RefreshTokenController();
const verifyOtpController = new VerifyOtpController(verifyOtp);
const googleController = new GoogleController(googleLoginUseCase);

export {
  userController,
  otpController,
  verifyOtpController,
  refreshTokenController,
  loginController,
  googleController
};
