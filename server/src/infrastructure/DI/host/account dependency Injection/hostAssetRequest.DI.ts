import { HostAssetRequestController } from "../../../../Presentation/controllers/host/hostAccountControllers/hostAssetRequest.controller";
import { HostAssetRequestRepository } from "../../../repositories/host/account/repository.hostAssetRequests";
import { HostAssetRequestUseCase } from "../../../../application/use-cases/host/host account/usecase.hostAssetRequests";

const hostAssetRequestRepository = new HostAssetRequestRepository();
const hostAssetRequestUseCase = new HostAssetRequestUseCase(
  hostAssetRequestRepository
);
const hostAssetRequestController = new HostAssetRequestController(
  hostAssetRequestUseCase
);

export { hostAssetRequestController };
