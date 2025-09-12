import { HostBookingsRepository } from "../../../repositories/host/hostAccountRepositories/repository.hostBookings";
import { HostBookingsUseCase } from "../../../../application/usecases/host/hostAccountUsecases/usecase.hostBookings";
import { HostBookingController } from "../../../../adapters/controllers/host/hostAccountControllers/hostBookings.controller";

const hostBookingsRepository = new HostBookingsRepository();
const hostBookingsUseCase = new HostBookingsUseCase(hostBookingsRepository);
const hostBookingController = new HostBookingController(hostBookingsUseCase);
export { hostBookingController };
