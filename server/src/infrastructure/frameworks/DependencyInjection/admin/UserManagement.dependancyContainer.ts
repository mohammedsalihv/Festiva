import { UserAdminController } from "../../../../Presentation/controllers/admin/UserAdmin.Controller";

import { UserManagementUseCase } from "../../../../application/use-cases/admin/UserManagement.usecase";

import { UserManagementRepostory } from "../../../repositories/admin/UserManagement.repository";

const userManagementRepostory = new UserManagementRepostory();
const getUsers = new UserManagementUseCase(userManagementRepostory);
const adminController = new UserAdminController(getUsers);

export { adminController };
