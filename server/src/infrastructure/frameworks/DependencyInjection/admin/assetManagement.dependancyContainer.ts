import { AssetManagementUseCase } from "../../../../application/use-cases/admin/AssetManagement.usecase";
import { AssetManagementRepository } from "../../../repositories/admin/repository.assetManagement";
import { AssetAdminController } from "../../../../Presentation/controllers/admin/AssetAdmin.controller";
import { adminVenueController } from "./adminVenue.dependancyContainer";

const assetManagementRepository = new AssetManagementRepository();
const assetManagementUseCase = new AssetManagementUseCase(
  assetManagementRepository
);
const assetAdminController = new AssetAdminController(
  assetManagementUseCase,
  adminVenueController
);

export { assetAdminController };
