import { HostRentCarController } from "../../../../adapters/controllers/host/hostServiceControllers/hostRentCar.controller";
import { HostRentCarUseCase } from "../../../../application/usecases/host/hostServicesUsecases/usecase.hostRentcar";
import { HostRentCarRepository } from "../../../repositories/host/hostServicesRepositories/repository.hostRentCar";
import { LocationRepository } from "../../../repositories/host/hostServicesRepositories/repository.location";
import { LocationUseCase } from "../../../../application/usecases/host/hostBaseUsecases/usecase.location";

const hostRentCarRepository = new HostRentCarRepository();
const locationRepository = new LocationRepository();
const locationUseCase = new LocationUseCase(locationRepository);
const hostRentCarUseCase = new HostRentCarUseCase(hostRentCarRepository);
const hostRentCarController = new HostRentCarController(
  hostRentCarUseCase,
  locationUseCase
);

export { hostRentCarController };
