import { AdminController } from "../../../../Presentation/controllers/admin/admin.controller";

import { UserManagementUseCase } from "../../../../application/use-cases/admin/UserManagement.usecase";

import { UserManagementRepostory } from "../../../repositories/admin/UserManagement.repository";


const userManagementRepostory = new UserManagementRepostory()
const getUsers = new UserManagementUseCase(userManagementRepostory)
const adminController = new AdminController(getUsers)

export {adminController}
