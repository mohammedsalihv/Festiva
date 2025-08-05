import { HostRentCarController } from "../../../../adapters/controllers/host/hostServiceControllers/hostRentCar.controller";
import { HostRentCarUseCase } from "../../../../application/usecases/host/hostServicesUsecases/usecase.hostRentcar";
import { HostRentCarRepository } from "../../../repositories/host/hostServiceRepositories/repository.hostRentCar";
import { LocationRepository } from "../../../repositories/host/hostServiceRepositories/repository.location";

const hostRentCarRepository = new HostRentCarRepository();
const locationRepository = new LocationRepository();
const hostRentCarUseCase = new HostRentCarUseCase(hostRentCarRepository);
const hostRentCarController = new HostRentCarController(
  hostRentCarUseCase,
  locationRepository
);

export { hostRentCarController };
