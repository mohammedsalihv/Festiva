import { AdminHostsController } from "../../../../Presentation/controllers/admin/adminManagementControllers/adminHost.controller";
import { AdminHostManagementUseCase } from "../../../../application/usecases/admin/adminManagementUsecases/usecase.adminHostManagement";
import { AdminHostManagementRepostory } from "../../../repositories/admin/adminManagementRepositories/repository.adminHostManagement";
const adminHostManagementRepostory = new AdminHostManagementRepostory();
const adminHostManagementUseCase = new AdminHostManagementUseCase(
  adminHostManagementRepostory
);
const adminHostController = new AdminHostsController(
  adminHostManagementUseCase
);

export { adminHostController };
