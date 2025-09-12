import { AdminBookingManagementRepository } from "../../../repositories/admin/adminManagementRepositories/repository.adminBookingManagement";
import { PaymentRepository } from "../../../repositories/base/basePaymentsRepositories/repository.payment";
import { ReviewRepository } from "../../../repositories/base/baseReviewRepositories/repository.review";
import { AdminUserManagementRepository } from "../../../repositories/admin/adminManagementRepositories/repository.adminUserManagement";
import { AdminHostManagementRepostory } from "../../../repositories/admin/adminManagementRepositories/repository.adminHostManagement";
import { AdminVenueRepository } from "../../../repositories/admin/adminServicesRepositories/repository.adminVenue";
import { AdminRentCarRepository } from "../../../repositories/admin/adminServicesRepositories/repository.adminRentCar";
import { AdminCatersRepository } from "../../../repositories/admin/adminServicesRepositories/repository.adminCaters";
import { AdminStudioRepository } from "../../../repositories/admin/adminServicesRepositories/repository.adminStudio";
import { AdminDashboardUseCase } from "../../../../application/usecases/admin/adminBaseUsecases/usecase.adminDashboard";
import { AdminDashboardController } from "../../../../adapters/controllers/admin/adminBaseControllers/adminDashboard.controller";

const adminBookingManagementRepository = new AdminBookingManagementRepository();
const paymentRepository = new PaymentRepository();
const reviewRepository = new ReviewRepository();
const adminUserManagementRepository = new AdminUserManagementRepository();
const adminHostManagementRepostory = new AdminHostManagementRepostory();
const adminVenueRepository = new AdminVenueRepository();
const adminRentCarRepository = new AdminRentCarRepository();
const adminCatersRepository = new AdminCatersRepository();
const adminStudioRepository = new AdminStudioRepository();
const adminDashboardUseCase = new AdminDashboardUseCase(
  adminBookingManagementRepository,
  paymentRepository,
  reviewRepository,
  adminUserManagementRepository,
  adminHostManagementRepostory,
  adminVenueRepository,
  adminRentCarRepository,
  adminCatersRepository,
  adminStudioRepository
);
const adminDashboardController = new AdminDashboardController(
  adminDashboardUseCase
);
export { adminDashboardController };
