import { HostAdminController } from "../../../../Presentation/controllers/admin/HostAdmin.Controller";

import { HostManagementUseCase } from "../../../../application/use-cases/admin/HostManagement.usecase";

import { HostManagementRepostory } from "../../../repositories/admin/HostManagement.repository";

const hostManagementRepostory = new HostManagementRepostory();
const getHosts = new HostManagementUseCase(hostManagementRepostory);
const hostAdminController = new HostAdminController(getHosts);

export { hostAdminController };
