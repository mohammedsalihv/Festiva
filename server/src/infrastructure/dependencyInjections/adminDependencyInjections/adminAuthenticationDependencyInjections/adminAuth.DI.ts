import { TokenService } from "../../../../application/tokenService/service.token";
import { AdminLoginValidator } from "../../../../utils/validations/adminValidations/adminLoginValidation";
import { AdminLoginController } from "../../../../adapters/controllers/admin/adminAuthenticationControllers/adminLogin.controller";
import { AdminLogoutController } from "../../../../adapters/controllers/admin/adminAuthenticationControllers/adminLogout.controller";
import { RefreshTokenController } from "../../../../adapters/controllers/base/baseAuthenticationControllers/refreshToken.controller";
import { AdminLoginUsecase } from "../../../../application/usecases/admin/adminAuthenticationUsecases/usecase.adminLogin";
import { AdminLogoutUseCase } from "../../../../application/usecases/admin/adminAuthenticationUsecases/usecase.adminLogout";
import { AdminRepository } from "../../../repositories/admin/adminBaseRepositories/repository.admin";
import { AdminLoginRepository } from "../../../repositories/admin/adminAuthenitcationRepositories/repository.adminLogin";
import { AdminLogoutRepository } from "../../../repositories/admin/adminAuthenitcationRepositories/repository.adminLogout";

const tokenService = new TokenService();
const adminLoginValidator = new AdminLoginValidator();

const adminLoginRepository = new AdminLoginRepository();
const adminRepository = new AdminRepository();
const adminLogoutRepository = new AdminLogoutRepository();

const adminLogin = new AdminLoginUsecase(
  adminLoginRepository,
  adminRepository,
  tokenService,
  adminLoginValidator
);
const adminLogoutUseCase = new AdminLogoutUseCase(adminLogoutRepository);

const adminLoginController = new AdminLoginController(adminLogin);
const refreshTokenController = new RefreshTokenController(tokenService);
const adminLogoutController = new AdminLogoutController(adminLogoutUseCase);

export { adminLoginController, refreshTokenController, adminLogoutController };
