import { AdminUsersController } from "../../../../adapters/controllers/admin/adminManagementControllers/adminUser.controller";
import { AdminUserManagementUseCase } from "../../../../application/usecases/admin/adminManagementUsecases/usecase.adminUserManagement";
import { AdminUserManagementRepository } from "../../../repositories/admin/adminManagementRepositories/repository.adminUserManagement";

const adminUserManagementRepository = new AdminUserManagementRepository();
const adminUserManagementUseCase = new AdminUserManagementUseCase(
  adminUserManagementRepository
);
const adminUserController = new AdminUsersController(adminUserManagementUseCase);

export { adminUserController };
