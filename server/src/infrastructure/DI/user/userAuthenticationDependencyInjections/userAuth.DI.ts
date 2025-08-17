import { TokenService } from "../../../../application/tokenService/service.token";

import { UserLoginValidator } from "../../../../utils/validations/user/userLoginValidator";
import { UserGoogleLoginValidator } from "../../../../utils/validations/user/userGoogleLoginValidator";

// controllers

import { UserController } from "../../../../adapters/controllers/user/userBaseControllers/user.controller";
import { UserSignupController } from "../../../../adapters/controllers/user/userAuthenticationControllers/userSignup.controller";
import { RefreshTokenController } from "../../../../adapters/controllers/base/baseAuthenticationControllers/refreshToken.controller";
import { UserLoginController } from "../../../../adapters/controllers/user/userAuthenticationControllers/userLogin.controller";
import { UserGoogleLoginController } from "../../../../adapters/controllers/user/userAuthenticationControllers/userGoogleLogin.controller";
import { UserLogoutController } from "../../../../adapters/controllers/user/userAuthenticationControllers/userLogout.controller";

//use-cases

import { UserSignupUseCase } from "../../../../application/usecases/user/userAuthenticationUsecases/usecase.userSignup";
import { UserLoginUseCase } from "../../../../application/usecases/user/userAuthenticationUsecases/usecase.userLogin";
import { UserGoogleLoginUseCase } from "../../../../application/usecases/user/userAuthenticationUsecases/usecase.userGoogleLogin";
import { UserPasswordResetUseCase } from "../../../../application/usecases/user/userAuthenticationUsecases/usecase.passwordReset";
import { UserLogoutUseCase } from "../../../../application/usecases/user/userAuthenticationUsecases/usecase.userLogout";
import { UserUseCase } from "../../../../application/usecases/user/userBaseUsecase/usecase.user";
//repositories

import { UserSignupRepository } from "../../../repositories/user/userAuthenitcationRepositories/repository.userSignup";
import { UserLoginRepository } from "../../../repositories/user/userAuthenitcationRepositories/repository.userLogin";
import { UserGoogleLoginRepository } from "../../../repositories/user/userAuthenitcationRepositories/repository.userGoogleLogin";
import { UserRepository } from "../../../repositories/user/userBaseRepositories/repository.user";
import { UserLogoutRepository } from "../../../repositories/user/userAuthenitcationRepositories/repository.userLogout";

const tokenService = new TokenService();
const hostLoginValidator = new UserLoginValidator();
const userGoogleLoginValidator = new UserGoogleLoginValidator();

// Instantiating Repositories

const userRegisterRepository = new UserSignupRepository();
const userLoginRepository = new UserLoginRepository();
const userRepository = new UserRepository();
const userGoogleLoginRepository = new UserGoogleLoginRepository();
const userLogoutRepository = new UserLogoutRepository();

// Instantiate use cases
const userSignupUseCase = new UserSignupUseCase(
  userRegisterRepository,
  tokenService
);

const userLoginUseCase = new UserLoginUseCase(
  userLoginRepository,
  userRepository,
  tokenService,
  hostLoginValidator
);

const userGoogleLoginUseCase = new UserGoogleLoginUseCase(
  userGoogleLoginRepository,
  tokenService,
  userGoogleLoginValidator
);
const userResetPasswordUseCase = new UserPasswordResetUseCase(userRepository);
const userUseCase = new UserUseCase(userRepository);
const userLogoutUseCase = new UserLogoutUseCase(userLogoutRepository);

// Instantiate controllers
const userSignupController = new UserSignupController(userSignupUseCase);
const userLoginController = new UserLoginController(userLoginUseCase);
const refreshTokenController = new RefreshTokenController(tokenService);
const userGoogleLoginController = new UserGoogleLoginController(
  userGoogleLoginUseCase,
  userGoogleLoginValidator
);
const userController = new UserController(
  userResetPasswordUseCase,
  userUseCase
);
const userLogoutController = new UserLogoutController(userLogoutUseCase);

export {
  userController,
  userSignupController,
  refreshTokenController,
  userLoginController,
  userGoogleLoginController,
  userLogoutController,
};
