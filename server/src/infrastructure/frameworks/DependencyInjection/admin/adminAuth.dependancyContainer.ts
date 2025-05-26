// Controller

import { AdminLoginController } from "../../../../Presentation/controllers/admin/auth/adminLogin.controller";
import { RefreshTokenController } from "../../../../Presentation/controllers/user/auth/refreshToken.controller";

// use-case

import { LoginAdmin } from "../../../../application/use-cases/admin/Auth/loginAdmin";

// repositories

import { AdminRepository } from "../../../repositories/admin/auth/repository.admin";
import { AdminLoginRepository } from "../../../repositories/admin/auth/repository.adminLogin";

// Instantiating Repositories

const adminLoginRepository = new AdminLoginRepository();
const adminRepository = new AdminRepository();

// Instantiating use-case

const loginAdmin = new LoginAdmin(adminLoginRepository, adminRepository);

// Instantiating controllers

const adminLoginController = new AdminLoginController(loginAdmin);
const refreshTokenController = new RefreshTokenController();

export { adminLoginController, refreshTokenController };
