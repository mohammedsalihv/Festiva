// Jwt token

import { TokenService } from "../../../../application/tokenService/service.token";

// Controller

import { AdminLoginController } from "../../../../Presentation/controllers/admin/adminAuthControllers/adminLogin.controller";
import { RefreshTokenController } from "../../../../Presentation/controllers/user/userAuthenticationControllers/userRefreshToken.controller";

// use-case

import { AdminLoginUsecase } from "../../../../application/use-cases/admin/adminAuthentication/usecase.adminLogin";

// repositories

import { AdminRepository } from "../../../repositories/admin/auth/repository.admin";
import { AdminLoginRepository } from "../../../repositories/admin/auth/repository.adminLogin";





const tokenService = new TokenService();

// Instantiating Repositories

const adminLoginRepository = new AdminLoginRepository();
const adminRepository = new AdminRepository();

// Instantiating use-case

const adminLogin = new AdminLoginUsecase(
  adminLoginRepository,
  adminRepository,
  tokenService
);

// Instantiating controllers

const adminLoginController = new AdminLoginController(adminLogin);

const refreshTokenController = new RefreshTokenController(tokenService);

export { adminLoginController, refreshTokenController };
