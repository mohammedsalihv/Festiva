import { HostRentCarController } from "../../../../Presentation/controllers/host/hostServiceControllers/hostRentCar.controller";
import { HostRentCarUseCase } from "../../../../application/usecases/host/hostServicesUsecases/usecase.hostRentcar";
import { HostRentCarRepository } from "../../../repositories/host/hostServiceRepositories/repository.hostRentCar";
import { HostAssetLocationRepository } from "../../../repositories/host/hostServiceRepositories/repository.hostAssetLocation";

const hostRentCarRepository = new HostRentCarRepository();
const hostAssetLocationRepository = new HostAssetLocationRepository();
const hostRentCarUseCase = new HostRentCarUseCase(hostRentCarRepository);
const hostRentCarController = new HostRentCarController(
  hostRentCarUseCase,
  hostAssetLocationRepository
);

export { hostRentCarController };
