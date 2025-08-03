import { TokenService } from "../../../../application/tokenService/service.token";
import { HostLoginUsecaseValidator } from "../../../../utils/validations/host/hostLoginValidator";
import { HostSignupValidator } from "../../../../utils/validations/host/hostSignupValidator";
import { HostLoginControllerValidator } from "../../../../utils/validations/host/hostLoginValidator";
import { HostGoogleLoginValidator } from "../../../../utils/validations/host/hostGoogleLoginValidator";
import { HostGoogleSignupValidator } from "../../../../utils/validations/host/hostGoogleSignupValidator";

// Controller

import { HostLoginController } from "../../../../adapters/controllers/host/hostAuthenticationControllers/hostLogin.controller";
import { HostSignupController } from "../../../../adapters/controllers/host/hostAuthenticationControllers/hostSignup.controller";
import { HostGoogleSignupController } from "../../../../adapters/controllers/host/hostAuthenticationControllers/hostGoogleSignup.controller";
import { HostGoogleLoginController } from "../../../../adapters/controllers/host/hostAuthenticationControllers/hostGoogleLogin.controller";
import { RefreshTokenController } from "../../../../adapters/controllers/user/userAuthenticationControllers/userRefreshToken.controller";
import { HostLogoutController } from "../../../../adapters/controllers/host/hostAuthenticationControllers/hostLogout.controller";

// use-case

import { HostSignupUseCase } from "../../../../application/usecases/host/hostAuthenticationUsecases/usecase.hostSignup";
import { HostLoginUseCase } from "../../../../application/usecases/host/hostAuthenticationUsecases/usecase.hostLogin";
import { HostGoogleLoginUseCase } from "../../../../application/usecases/host/hostAuthenticationUsecases/usecase.hostGoogleLogin";
import { HostGoogleSignupUseCase } from "../../../../application/usecases/host/hostAuthenticationUsecases/usecase.hostGoogleSignup";
import { HostLogoutUseCase } from "../../../../application/usecases/host/hostAuthenticationUsecases/usecase.hostLogout";

// repositories
import { HostLoginRepository } from "../../../repositories/host/hostAuthenitcationRepositories/repository.hostLogin";
import { HostSignupRepository } from "../../../repositories/host/hostAuthenitcationRepositories/repository.hostSignup";
import { HostGoogleLoginRepository } from "../../../repositories/host/hostAuthenitcationRepositories/repository.hostGoogleLogin";
import { HostGoogleSignupRepository } from "../../../repositories/host/hostAuthenitcationRepositories/repository.hostGoogleSignup";
import { HostRepository } from "../../../repositories/host/hostBaseRepositories/repository.host";
import { HostLogoutRepository } from "../../../repositories/host/hostAuthenitcationRepositories/repository.hostLogout";

const tokenService = new TokenService();
const hostLoginUsecaseValidator = new HostLoginUsecaseValidator();
const hostSignupValidator = new HostSignupValidator();
const hostLoginControllerValidator = new HostLoginControllerValidator();
const hostGoogleLoginValidator = new HostGoogleLoginValidator();
const hostGoogleSignupValidator = new HostGoogleSignupValidator();

// Instantiating Repositories

const hostSignupRepository = new HostSignupRepository();
const hostLoginRepository = new HostLoginRepository();
const hostGoogleLoginRepository = new HostGoogleLoginRepository();
const hostGoogleSignupRepository = new HostGoogleSignupRepository();
const hostRepository = new HostRepository();
const hostLogoutRepository = new HostLogoutRepository();

// Instantiating use-case

const hostSignupUseCase = new HostSignupUseCase(
  hostSignupRepository,
  hostRepository,
  tokenService
);
const hostLoginUseCase = new HostLoginUseCase(
  hostLoginRepository,
  hostRepository,
  tokenService,
  hostLoginUsecaseValidator
);

const hostGoogleLoginUseCase = new HostGoogleLoginUseCase(
  hostRepository,
  hostGoogleLoginRepository,
  tokenService
);
const hostGoogleSignupUseCase = new HostGoogleSignupUseCase(
  hostRepository,
  hostGoogleSignupRepository,
  tokenService
);
const hostLogoutUseCase = new HostLogoutUseCase(hostLogoutRepository);

// Instantiating controllers

const hostSignupController = new HostSignupController(
  hostSignupUseCase,
  hostSignupValidator
);
const hostLoginController = new HostLoginController(
  hostLoginUseCase,
  hostLoginControllerValidator
);
const hostGoogleLoginController = new HostGoogleLoginController(
  hostGoogleLoginUseCase,
  hostGoogleLoginValidator
);
const hostGoogleSignupController = new HostGoogleSignupController(
  hostGoogleSignupUseCase,
  hostGoogleSignupValidator
);
const refreshTokenController = new RefreshTokenController(tokenService);
const hostLogoutController = new HostLogoutController(hostLogoutUseCase);

export {
  hostSignupController,
  hostLoginController,
  hostGoogleLoginController,
  hostGoogleSignupController,
  refreshTokenController,
  hostLogoutController,
};
