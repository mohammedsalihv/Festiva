import { TokenService } from "../../../application/tokenService/service.token";

// controllers

import { UserController } from "../../../Presentation/controllers/user/userAuthenticationControllers/user.controller";
import { UserSignupController } from "../../../Presentation/controllers/user/userAuthenticationControllers/userSignup.controller";
import { OTPController } from "../../../Presentation/controllers/user/userAuthenticationControllers/userOtp.controller";
import { VerifyOtpController } from "../../../Presentation/controllers/user/userAuthenticationControllers/userVerifyOtp.controller";
import { RefreshTokenController } from "../../../Presentation/controllers/user/userAuthenticationControllers/userRefreshToken.controller";
import { UserLoginController } from "../../../Presentation/controllers/user/userAuthenticationControllers/userLogin.controller";
import { UserGoogleLoginController } from "../../../Presentation/controllers/user/userAuthenticationControllers/userGoogle.controller";
import { UserLogoutController } from "../../../Presentation/controllers/user/userAuthenticationControllers/userLogout.controller";

//use-cases

import { UserSignupUseCase } from "../../../application/use-cases/user/userAuthentication/usecase.userSignup";
import { OtpVerificationUseCase } from "../../../application/use-cases/user/userAuthentication/usecase.otpVerify";
import { OtpSendingUseCase } from "../../../application/use-cases/user/userAuthentication/usecase.otpSending";
import { UserLoginUseCase } from "../../../application/use-cases/user/userAuthentication/usecase.userLogin";
import { UserGoogleLoginUseCase } from "../../../application/use-cases/user/userAuthentication/usecase.userGoogleLogin";
import { UserPasswordResetUseCase } from "../../../application/use-cases/user/userAuthentication/usecase.passwordReset";
import { UserLogoutUseCase } from "../../../application/use-cases/user/userAuthentication/usecase.userLogout";

//repositories

import { UserSignupRepository } from "../../repositories/user/auth/repository.userSignup";
import { OTPRepository } from "../../repositories/user/auth/repository.otp";
import { OTPVerifyRepository } from "../../repositories/user/auth/repository.verifyOtp";
import { UserLoginRepository } from "../../repositories/user/auth/repository.userLogin";
import { UserGoogleAuthRepository } from "../../repositories/user/auth/repository.userGoogle";
import { UserRepository } from "../../repositories/user/pages/repository.user";
import { UserLogoutRepository } from "../../repositories/user/auth/repository.userLogout";

const tokenService = new TokenService();

// Instantiating Repositories

const userRegisterRepository = new UserSignupRepository();
const otpRepository = new OTPRepository();
const userLoginRepository = new UserLoginRepository();
const userRepository = new UserRepository();
const verifyOtpRepository = new OTPVerifyRepository();
const userGoogleAuthRepository = new UserGoogleAuthRepository();
const userLogoutRepository = new UserLogoutRepository();

// Instantiate use cases
const userSignupUseCase = new UserSignupUseCase(
  userRegisterRepository,
  tokenService
);
const sendOTPUseCase = new OtpSendingUseCase(otpRepository);
const userLoginUseCase = new UserLoginUseCase(
  userLoginRepository,
  userRepository,
  tokenService
);
const verifyOtpUseCase = new OtpVerificationUseCase(verifyOtpRepository);
const userGoogleLoginUseCase = new UserGoogleLoginUseCase(
  userGoogleAuthRepository,
  tokenService
);
const userResetPasswordUseCase = new UserPasswordResetUseCase(userRepository);
const userLogoutUseCase = new UserLogoutUseCase(userLogoutRepository);

// Instantiate controllers
const userSignupController = new UserSignupController(userSignupUseCase);
const otpController = new OTPController(sendOTPUseCase);
const userLoginController = new UserLoginController(userLoginUseCase);
const refreshTokenController = new RefreshTokenController(tokenService);
const verifyOtpController = new VerifyOtpController(verifyOtpUseCase);
const userGoogleLoginController = new UserGoogleLoginController(
  userGoogleLoginUseCase
);
const userController = new UserController(userResetPasswordUseCase);
const userLogoutController = new UserLogoutController(userLogoutUseCase);

export {
  userController,
  userSignupController,
  otpController,
  verifyOtpController,
  refreshTokenController,
  userLoginController,
  userGoogleLoginController,
  userLogoutController,
};
