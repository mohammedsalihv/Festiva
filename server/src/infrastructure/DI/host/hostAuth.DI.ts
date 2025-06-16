import { TokenService } from "../../../application/tokenService/service.token";

// Controller

import { HostLoginController } from "../../../Presentation/controllers/host/hostAuthenticationControllers/hostLogin.controller";
import { HostSignupController } from "../../../Presentation/controllers/host/hostAuthenticationControllers/hostSignup.controller";
import { RefreshTokenController } from "../../../Presentation/controllers/user/userAuthenticationControllers/userRefreshToken.controller";

// use-case

import { HostSignupUseCase } from "../../../application/use-cases/host/hostAuthentication/usecase.hostSignup";
import { HostLoginUseCase } from "../../../application/use-cases/host/hostAuthentication/usecase.hostLogin";

// repositories

import { HostLoginRepository } from "../../repositories/host/auth/repository.hostLogin";
import { HostSignupRepository } from "../../repositories/host/auth/repository.hostSignup";
import { HostRepository } from "../../repositories/host/auth/repository.host";

const tokenService = new TokenService();

// Instantiating Repositories

const hostSignupRepository = new HostSignupRepository();
const hostLoginRepository = new HostLoginRepository();
const hostRepository = new HostRepository();

// Instantiating use-case

const hostSignup = new HostSignupUseCase(
  hostSignupRepository,
  hostRepository,
  tokenService
);
const hostLogin = new HostLoginUseCase(
  hostLoginRepository,
  hostRepository,
  tokenService
);

// Instantiating controllers

const hostSignupController = new HostSignupController(hostSignup);
const hostLoginController = new HostLoginController(hostLogin);
const refreshTokenController = new RefreshTokenController(tokenService);

export { hostSignupController, hostLoginController, refreshTokenController };
