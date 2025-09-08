import { IAdminCatersRepository } from "../../../../domain/entities/repositoryInterface/admin/services/interface.adminCatersRepository";
import { IAdminRentCarRepository } from "../../../../domain/entities/repositoryInterface/admin/services/interface.adminRentCarRepository";
import { IAdminStudioRepository } from "../../../../domain/entities/repositoryInterface/admin/services/interface.adminStudioRepository";
import { IAdminVenueRepository } from "../../../../domain/entities/repositoryInterface/admin/services/interface.adminVenueRepository";
import { IAdminBookingManagementRepository } from "../../../../domain/entities/repositoryInterface/admin/management/interface.adminBookingManagementRepository";
import { IPaymentRepository } from "../../../../domain/entities/repositoryInterface/base/interface.paymentRepository";
import { IReviewRepository } from "../../../../domain/entities/repositoryInterface/base/interface.reviewRepository";
import { IAdminHostManagementRepository } from "../../../../domain/entities/repositoryInterface/admin/management/interface.adminHostManagementRepository";
import { IAdminUserManagementRepository } from "../../../../domain/entities/repositoryInterface/admin/management/interface.adminUserManagementRepository";
import { IAdminDashboardUseCase } from "../../../../domain/usecaseInterface/admin/adminBaseUsecaseInterfaces/interface.adminDashboardUseCase";
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
} from "../../../../types/DTO/admin/dto.adminDashboard";
import { mapAdminDashboard } from "../../../../utils/mapping/admin/adminDashboardMapper";

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
