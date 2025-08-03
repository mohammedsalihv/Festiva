// Jwt token

import { TokenService } from "../../../../application/tokenService/service.token";

import { AdminLoginValidator } from "../../../../utils/validations/admin/adminLoginValidation";

// Controller

import { AdminLoginController } from "../../../../adapters/controllers/admin/adminAuthControllers/adminLogin.controller";
import { RefreshTokenController } from "../../../../adapters/controllers/user/userAuthenticationControllers/userRefreshToken.controller";

// use-case

import { AdminLoginUsecase } from "../../../../application/usecases/admin/adminAuthenticationUsecases/usecase.adminLogin";

// repositories

import { AdminRepository } from "../../../repositories/admin/adminBaseRepositories/repository.admin";
import { AdminLoginRepository } from "../../../repositories/admin/adminAuthenitcationRepositories/repository.adminLogin";

const tokenService = new TokenService();
const adminLoginValidator = new AdminLoginValidator();

// Instantiating Repositories

const adminLoginRepository = new AdminLoginRepository();
const adminRepository = new AdminRepository();

// Instantiating use-case

const adminLogin = new AdminLoginUsecase(
  adminLoginRepository,
  adminRepository,
  tokenService,
  adminLoginValidator
);

// Instantiating controllers

const adminLoginController = new AdminLoginController(adminLogin);

const refreshTokenController = new RefreshTokenController(tokenService);

export { adminLoginController, refreshTokenController };
