import { UserBookingsRepository } from "../../../repositories/user/userAccountRepositories/repository.userBookings";
import { UserBookingsUseCase } from "../../../../application/usecases/user/userAccountUsecase/usecase.userBookings";
import { UserBookingsController } from "../../../../adapters/controllers/user/userAccountControllers/userBookings.controller";
import { PaymentRepository } from "../../../repositories/base/basePaymentsRepositories/repository.payment";
import { HostRepository } from "../../../repositories/host/hostBaseRepositories/repository.host";
import { LocationRepository } from "../../../repositories/host/hostServicesRepositories/repository.location";

const userBookingsRepository = new UserBookingsRepository();
const paymentsRepository = new PaymentRepository();
const hostRepository = new HostRepository();
const locationRepository = new LocationRepository();
const userBookingsUseCase = new UserBookingsUseCase(
  userBookingsRepository,
  paymentsRepository,
  hostRepository,
  locationRepository
);
const userBookingsController = new UserBookingsController(userBookingsUseCase);
export { userBookingsController };
