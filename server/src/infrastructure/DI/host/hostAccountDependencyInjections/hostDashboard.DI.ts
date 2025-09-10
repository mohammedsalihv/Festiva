import { HostBookingsRepository } from "../../../repositories/host/hostAccountRepositories/repository.hostBookings";
import { HostPaymentRepository } from "../../../repositories/host/hostBaseRepositories/repository.hostPayment";
import { HostCatersRepository } from "../../../repositories/host/hostServiceRepositories/repository.hostCaters";
import { HostVenueRepository } from "../../../repositories/host/hostServiceRepositories/repository.hostVenue";
import { HostRentCarRepository } from "../../../repositories/host/hostServiceRepositories/repository.hostRentCar";
import { HostStudioRepository } from "../../../repositories/host/hostServiceRepositories/repository.hostStudio";
import { HostDashbaordUseCase } from "../../../../application/usecases/host/hostAccountUsecases/usecase.hostDashboard";
import { HostDashboardController } from "../../../../adapters/controllers/host/hostAccountControllers/hostDashboard.controller";
import { UserRepository } from "../../../repositories/user/userBaseRepositories/repository.user";

const hostBookingsRepository = new HostBookingsRepository();
const hostPaymentRepository = new HostPaymentRepository();
const hostVenueRepository = new HostVenueRepository();
const hostStudioRepository = new HostStudioRepository();
const hostCatersRepository = new HostCatersRepository();
const hostRentCarRepository = new HostRentCarRepository();
const userRepository = new UserRepository();
const hostDashbaordUseCase = new HostDashbaordUseCase(
  hostBookingsRepository,
  hostPaymentRepository,
  hostVenueRepository,
  hostRentCarRepository,
  hostCatersRepository,
  hostStudioRepository,
  userRepository
);
const hostDashboardController = new HostDashboardController(
  hostDashbaordUseCase
);
export { hostDashboardController };
