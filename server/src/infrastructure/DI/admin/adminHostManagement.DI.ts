import { AdminHostsController } from "../../../Presentation/controllers/admin/adminManagementControllers/adminHost.controller";
import { AdminHostManagementUseCase } from "../../../application/use-cases/admin/adminManagement/usecase.adminHostManagement";
import { AdminHostManagementRepostory } from "../../repositories/admin/adminServiceRepositories/repository.adminHostManagement";

const adminHostManagementRepostory = new AdminHostManagementRepostory();
const adminHostManagementUseCase = new AdminHostManagementUseCase(
  adminHostManagementRepostory
);
const adminHostController = new AdminHostsController(
  adminHostManagementUseCase
);

export { adminHostController };
