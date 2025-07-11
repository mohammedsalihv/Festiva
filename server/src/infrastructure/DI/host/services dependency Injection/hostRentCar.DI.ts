import { HostRentCarController } from "../../../../Presentation/controllers/host/hostServiceControllers/hostRentCar.controller";
import { HostRentCarUseCase } from "../../../../application/use-cases/host/hostServices/usecase.hostRentcar";
import { HostRentCarRepository } from "../../../repositories/host/service/repository.hostRentCar";
import { HostAssetLocationRepository } from "../../../repositories/host/service/repository.hostAssetLocation";

const hostRentCarRepository = new HostRentCarRepository();
const hostAssetLocationRepository = new HostAssetLocationRepository();
const hostRentCarUseCase = new HostRentCarUseCase(hostRentCarRepository);
const hostRentCarController = new HostRentCarController(
  hostRentCarUseCase,
  hostAssetLocationRepository
);

export { hostRentCarController };
