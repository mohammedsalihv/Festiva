import { AssetManagementUseCase } from "../../../../application/use-cases/admin/assetManagement.usecase";
import { AssetManagementRepository } from "../../../repositories/admin/repository.assetManagement";
import { AssetAdminController } from "../../../../Presentation/controllers/admin/assetAdmin.controller";

const assetManagementRepository = new AssetManagementRepository();
const assetManagementUseCase = new AssetManagementUseCase(
  assetManagementRepository
);
const assetAdminController = new AssetAdminController(assetManagementUseCase);

export { assetAdminController };
