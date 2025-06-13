import { UserAdminController } from "../../../../Presentation/controllers/admin/UserAdmin.Controller";
import { UserManagementUseCase } from "../../../../application/use-cases/admin/userManagement.usecase";
import { UserManagementRepository } from "../../../repositories/admin/repository.userManagement";

const userManagementRepository = new UserManagementRepository();
const userManagementUseCase = new UserManagementUseCase(userManagementRepository);
const userAdminController = new UserAdminController(userManagementUseCase);

export { userAdminController };
