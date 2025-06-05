import { HostAdminController } from "../../../../Presentation/controllers/admin/hostAdmin.Controller";

import { HostManagementUseCase } from "../../../../application/use-cases/admin/hostManagement.usecase";

import { HostManagementRepostory } from "../../../repositories/admin/repository.hostManagement";

const hostManagementRepostory = new HostManagementRepostory();
const hostManagementUseCase = new HostManagementUseCase(hostManagementRepostory);
const hostAdminController = new HostAdminController(hostManagementUseCase);

export { hostAdminController };
