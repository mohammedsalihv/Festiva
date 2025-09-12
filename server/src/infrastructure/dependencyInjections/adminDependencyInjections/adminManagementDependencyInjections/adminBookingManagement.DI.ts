import { AdminBookingManagementRepository } from "../../../repositories/admin/adminManagementRepositories/repository.adminBookingManagement";
import { AdminBookingManagementController } from "../../../../adapters/controllers/admin/adminManagementControllers/adminBooking.controller";
import { AdminBookingManagementUseCase } from "../../../../application/usecases/admin/adminManagementUsecases/usecase.adminBookingManagement";
import { HostRepository } from "../../../repositories/host/hostBaseRepositories/repository.host";
import { UserRepository } from "../../../repositories/user/userBaseRepositories/repository.user";

const adminBookingManagementRepository = new AdminBookingManagementRepository();
const userRepository = new UserRepository();
const hostRepository = new HostRepository();
const adminBookingManagementUsecase = new AdminBookingManagementUseCase(
  adminBookingManagementRepository,
  hostRepository,
  userRepository
);
const adminBookingManagementController = new AdminBookingManagementController(
  adminBookingManagementUsecase
);

export { adminBookingManagementController };
