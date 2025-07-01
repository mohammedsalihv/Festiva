import { AdminUsersController } from "../../../../Presentation/controllers/admin/adminManagementControllers/adminUser.controller";
import { AdminUserManagementUseCase } from "../../../../application/use-cases/admin/adminManagement/usecase.adminUserManagement";
import { AdminUserManagementRepository } from "../../../repositories/admin/management/repository.adminUserManagement";

const adminUserManagementRepository = new AdminUserManagementRepository();
const adminUserManagementUseCase = new AdminUserManagementUseCase(
  adminUserManagementRepository
);
const adminUserController = new AdminUsersController(adminUserManagementUseCase);

export { adminUserController };
