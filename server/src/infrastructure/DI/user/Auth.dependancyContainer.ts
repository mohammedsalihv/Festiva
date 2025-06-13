// controllers

import { UserController } from "../../../../Presentation/controllers/user/auth/user.controller";
import { UserRegisterController } from "../../../../Presentation/controllers/user/auth/register.controller";
import { OTPController } from "../../../../Presentation/controllers/user/auth/otp.controller";
import { VerifyOtpController } from "../../../../Presentation/controllers/user/auth/verifyOtp.controller";
import { RefreshTokenController } from "../../../../Presentation/controllers/user/auth/refreshToken.controller";
import { LoginController } from "../../../../Presentation/controllers/user/auth/login.controller";
import { GoogleController } from "../../../../Presentation/controllers/user/auth/google.controller";
import { LogoutController } from "../../../../Presentation/controllers/user/auth/logout.controller";




//use-cases

import { RegisterUser } from "../../../../application/use-cases/user/Auth/registerUser";
import { VerifyOtp } from "../../../../application/use-cases/user/Auth/verifyOtp";
import { SendOTP } from "../../../../application/use-cases/user/Auth/sentOtp";
import { LoginUser } from "../../../../application/use-cases/user/Auth/loginUser";
import { GoogleLogin } from "../../../../application/use-cases/user/Auth/googleLogin";
import { ResetPassword } from "../../../../application/use-cases/user/Auth/resetPassowrd";
import { LogoutUser } from "../../../../application/use-cases/user/Auth/logoutUser";

//repositories

import { UserRegisterRepository } from "../../../repositories/user/auth/repository.userSignup";
import { OTPRepository } from "../../../repositories/user/auth/repository.otp";
import { OTPrepository } from "../../../repositories/user/auth/repository.verifyOtp";
import { LoginRepository } from "../../../repositories/user/auth/repository.userLogin";
import { GoogleAuthRepository } from "../../../repositories/user/auth/repository.userGoogle";
import { UserRepository } from "../../../repositories/user/pages/repository.user";
import { LogoutRepository } from "../../../repositories/user/auth/repository.userLogout";




// Instantiating Repositories

const userRegisterRepository = new UserRegisterRepository();
const otpRepository = new OTPRepository();
const loginRepository = new LoginRepository();
const userRepository = new UserRepository();
const verifyOtpRepository = new OTPrepository();
const googleAuthRepository = new GoogleAuthRepository();
const logoutRepository = new LogoutRepository()



// Instantiate use cases
const registerUser = new RegisterUser(userRegisterRepository);
const SendOTPUseCase = new SendOTP(otpRepository);
const loginUser = new LoginUser(loginRepository, userRepository);
const verifyOtp = new VerifyOtp(verifyOtpRepository);
const googleLoginUseCase = new GoogleLogin(googleAuthRepository);
const resetPassword = new ResetPassword(userRepository)
const logoutUser = new LogoutUser(logoutRepository)


// Instantiate controllers
const userRegisterController = new UserRegisterController(registerUser);
const otpController = new OTPController(SendOTPUseCase);
const loginController = new LoginController(loginUser);
const refreshTokenController = new RefreshTokenController();
const verifyOtpController = new VerifyOtpController(verifyOtp);
const googleController = new GoogleController(googleLoginUseCase);
const userController = new UserController(resetPassword)
const logoutController = new LogoutController(logoutUser)


export {
  userController,
  userRegisterController,
  otpController,
  verifyOtpController,
  refreshTokenController,
  loginController,
  googleController,
  logoutController
};
