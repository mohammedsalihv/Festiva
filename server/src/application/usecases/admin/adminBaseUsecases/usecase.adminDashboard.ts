import { IAdminCatersRepository } from "../../../../domain/repositoryInterfaces/adminRepositoryInterfaces/adminServicesRepositoryInterfaces/interface.adminCatersRepository";
import { IAdminRentCarRepository } from "../../../../domain/repositoryInterfaces/adminRepositoryInterfaces/adminServicesRepositoryInterfaces/interface.adminRentCarRepository";
import { IAdminStudioRepository } from "../../../../domain/repositoryInterfaces/adminRepositoryInterfaces/adminServicesRepositoryInterfaces/interface.adminStudioRepository";
import { IAdminVenueRepository } from "../../../../domain/repositoryInterfaces/adminRepositoryInterfaces/adminServicesRepositoryInterfaces/interface.adminVenueRepository";
import { IAdminBookingManagementRepository } from "../../../../domain/repositoryInterfaces/adminRepositoryInterfaces/adminManagementRepositoryInterfaces/interface.adminBookingManagementRepository";
import { IPaymentRepository } from "../../../../domain/repositoryInterfaces/baseRepositoryInterfaces/basePaymentsRepositoryInterfaces/interface.paymentRepository";
import { IReviewRepository } from "../../../../domain/repositoryInterfaces/baseRepositoryInterfaces/baseServicesRepositoryInterfaces/interface.reviewRepository";
import { IAdminHostManagementRepository } from "../../../../domain/repositoryInterfaces/adminRepositoryInterfaces/adminManagementRepositoryInterfaces/interface.adminHostManagementRepository";
import { IAdminUserManagementRepository } from "../../../../domain/repositoryInterfaces/adminRepositoryInterfaces/adminManagementRepositoryInterfaces/interface.adminUserManagementRepository";
import { IAdminDashboardUseCase } from "../../../../domain/usecaseInterfaces/adminUsecaseInterfaces/adminBaseUsecaseInterfaces/interface.adminDashboardUseCase";
import {
  revenueResponse,
  serviceStatisticsResponse,
  serviceOverviewsResponse,
  totalUsersResponse,
  totalHostsResponse,
  totalBookingsResponse,
  totalIncomeResponse,
  allReviewsResponse,
  recentActivitiesResponse,
} from "../../../../types/DTO's/adminDTO's/adminAccountDTO's/dto.adminDashboard";
import { mapAdminDashboard } from "../../../../utils/mapping/adminMappings/adminDashboardMapper";

export class AdminDashboardUseCase implements IAdminDashboardUseCase {
  constructor(
    private _adminBookingManagementRepository: IAdminBookingManagementRepository,
    private _paymentRepository: IPaymentRepository,
    private _reviewRepository: IReviewRepository,
    private _adminUserManagementRepository: IAdminUserManagementRepository,
    private _adminHostManagementRepository: IAdminHostManagementRepository,
    private _venueRepository: IAdminVenueRepository,
    private _rentcarRepository: IAdminRentCarRepository,
    private _catersRepository: IAdminCatersRepository,
    private _studioRepository: IAdminStudioRepository
  ) {}

  async adminDashboard(): Promise<{
    revenues?: revenueResponse[];
    serviceStatistics?: serviceStatisticsResponse;
    serviceOverviews?: serviceOverviewsResponse;
    users?: totalUsersResponse;
    hosts?: totalHostsResponse;
    totalBookings?: totalBookingsResponse;
    totalIncome?: totalIncomeResponse;
    reviews?: allReviewsResponse[];
    recentActivities?: recentActivitiesResponse;
  }> {
    const [
      allBookings,
      allPayments,
      allReviews,
      allUsers,
      allHosts,
      allVenues,
      allRentcars,
      allCaters,
      allStudios,
    ] = await Promise.all([
      this._adminBookingManagementRepository.getAllBookings(),
      this._paymentRepository.getAllPayments(),
      this._reviewRepository.getAllReviews(),
      this._adminUserManagementRepository.getAllUsers(),
      this._adminHostManagementRepository.getAllHosts(),
      this._venueRepository.getAllVenues(),
      this._rentcarRepository.getAllRentCars(),
      this._catersRepository.getAllCaters(),
      this._studioRepository.getAllStudios(),
    ]);

    return mapAdminDashboard(
      allBookings,
      allPayments,
      allReviews,
      allUsers,
      allHosts,
      allVenues,
      allRentcars,
      allCaters,
      allStudios
    );
  }
}
