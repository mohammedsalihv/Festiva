import { TokenService } from "../../../../application/tokenService/service.token";

// Controller

import { HostLoginController } from "../../../../Presentation/controllers/host/hostAuthenticationControllers/hostLogin.controller";
import { HostSignupController } from "../../../../Presentation/controllers/host/hostAuthenticationControllers/hostSignup.controller";
import { RefreshTokenController } from "../../../../Presentation/controllers/user/userAuthenticationControllers/userRefreshToken.controller";
import { HostLogoutController } from "../../../../Presentation/controllers/host/hostAuthenticationControllers/hostLogout.controller";
// use-case

import { HostSignupUseCase } from "../../../../application/use-cases/host/hostAuthentication/usecase.hostSignup";
import { HostLoginUseCase } from "../../../../application/use-cases/host/hostAuthentication/usecase.hostLogin";
import { HostLogoutUseCase } from "../../../../application/use-cases/host/hostAuthentication/usecase.hostLogout";

// repositories
import { HostLoginRepository } from "../../../repositories/host/auth/repository.hostLogin";
import { HostSignupRepository } from "../../../repositories/host/auth/repository.hostSignup";
import { HostRepository } from "../../../repositories/host/auth/repository.host";
import { HostLogoutRepository } from "../../../repositories/host/auth/repository.hostLogout";

const tokenService = new TokenService();

// Instantiating Repositories

const hostSignupRepository = new HostSignupRepository();
const hostLoginRepository = new HostLoginRepository();
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
  tokenService
);

const hostLogoutUseCase = new HostLogoutUseCase(hostLogoutRepository);

// Instantiating controllers

const hostSignupController = new HostSignupController(hostSignupUseCase);
const hostLoginController = new HostLoginController(hostLoginUseCase);
const refreshTokenController = new RefreshTokenController(tokenService);
const hostLogoutController = new HostLogoutController(hostLogoutUseCase);

export {
  hostSignupController,
  hostLoginController,
  refreshTokenController,
  hostLogoutController,
};
