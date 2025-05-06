// Controller

import { AdminLoginController } from "../../../../Presentation/controllers/admin/auth/adminLogin.controller";
import { RefreshTokenController } from "../../../../Presentation/controllers/user/auth/refreshToken.controller";

// use-case

import { LoginAdmin } from "../../../../application/use-cases/admin/Auth/loginAdmin";

// repositories

import { adminLoginRepository } from "../../../repositories/admin/auth/adminLogin.repository";


// Instantiating Repositories

const AdminLoginRepository = new adminLoginRepository();

// Instantiating use-case

const loginAdmin = new LoginAdmin(AdminLoginRepository);


// Instantiating controllers

const adminLoginController = new AdminLoginController(loginAdmin);
const refreshTokenController = new RefreshTokenController();

export {  adminLoginController, refreshTokenController };
