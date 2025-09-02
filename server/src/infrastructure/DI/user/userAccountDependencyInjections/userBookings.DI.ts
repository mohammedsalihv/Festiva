import { UserBookingsRepository } from "../../../repositories/user/userProfileRepositories/repository.userBookings";
import { UserBookingsUseCase } from "../../../../application/usecases/user/userProfileUsecase/usecase.userBookings";
import { UserBookingsController } from "../../../../adapters/controllers/user/userPagesControllers/userBookings.controller";
import { PaymentRepository } from "../../../repositories/base/paymentsRepositories/repository.payment";
import { HostRepository } from "../../../repositories/host/hostBaseRepositories/repository.host";
import { LocationRepository } from "../../../repositories/host/hostServiceRepositories/repository.location";

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
