import { TokenService } from "../../../../application/tokenService/service.token";

// controllers

import { UserController } from "../../../../Presentation/controllers/user/userAuthenticationControllers/user.controller";
import { UserSignupController } from "../../../../Presentation/controllers/user/userAuthenticationControllers/userSignup.controller";
import { RefreshTokenController } from "../../../../Presentation/controllers/user/userAuthenticationControllers/userRefreshToken.controller";
import { UserLoginController } from "../../../../Presentation/controllers/user/userAuthenticationControllers/userLogin.controller";
import { UserGoogleLoginController } from "../../../../Presentation/controllers/user/userAuthenticationControllers/userGoogle.controller";
import { UserLogoutController } from "../../../../Presentation/controllers/user/userAuthenticationControllers/userLogout.controller";

//use-cases

import { UserSignupUseCase } from "../../../../application/use-cases/user/authentication/usecase.userSignup";
import { UserLoginUseCase } from "../../../../application/use-cases/user/authentication/usecase.userLogin";
import { UserGoogleLoginUseCase } from "../../../../application/use-cases/user/authentication/usecase.userGoogleLogin";
import { UserPasswordResetUseCase } from "../../../../application/use-cases/user/authentication/usecase.passwordReset";
import { UserLogoutUseCase } from "../../../../application/use-cases/user/authentication/usecase.userLogout";

//repositories

import { UserSignupRepository } from "../../../repositories/user/auth/repository.userSignup";
import { UserLoginRepository } from "../../../repositories/user/auth/repository.userLogin";
import { UserGoogleAuthRepository } from "../../../repositories/user/auth/repository.userGoogle";
import { UserRepository } from "../../../repositories/user/pages/repository.user";
import { UserLogoutRepository } from "../../../repositories/user/auth/repository.userLogout";

const tokenService = new TokenService();

// Instantiating Repositories

const userRegisterRepository = new UserSignupRepository();
const userLoginRepository = new UserLoginRepository();
const userRepository = new UserRepository();
const userGoogleAuthRepository = new UserGoogleAuthRepository();
const userLogoutRepository = new UserLogoutRepository();

// Instantiate use cases
const userSignupUseCase = new UserSignupUseCase(
  userRegisterRepository,
  tokenService
);
const userLoginUseCase = new UserLoginUseCase(
  userLoginRepository,
  userRepository,
  tokenService
);
const userGoogleLoginUseCase = new UserGoogleLoginUseCase(
  userGoogleAuthRepository,
  tokenService
);
const userResetPasswordUseCase = new UserPasswordResetUseCase(userRepository);
const userLogoutUseCase = new UserLogoutUseCase(userLogoutRepository);

// Instantiate controllers
const userSignupController = new UserSignupController(userSignupUseCase);
const userLoginController = new UserLoginController(userLoginUseCase);
const refreshTokenController = new RefreshTokenController(tokenService);
const userGoogleLoginController = new UserGoogleLoginController(
  userGoogleLoginUseCase
);
const userController = new UserController(userResetPasswordUseCase);
const userLogoutController = new UserLogoutController(userLogoutUseCase);

export {
  userController,
  userSignupController,
  refreshTokenController,
  userLoginController,
  userGoogleLoginController,
  userLogoutController,
};
