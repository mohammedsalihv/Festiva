import {
  allReviewsResponse,
  recentActivitiesResponse,
  revenueResponse,
  serviceOverviewsResponse,
  serviceStatisticsResponse,
  totalBookingsResponse,
  totalHostsResponse,
  totalIncomeResponse,
  totalUsersResponse,
} from "../../../../types/DTO/admin/dto.adminDashboard";

export interface IAdminDashboardUseCase {
  adminDashboard(): Promise<{
    revenues?: revenueResponse[];
    serviceStatistics?: serviceStatisticsResponse;
    serviceOverviews?: serviceOverviewsResponse;
    users?: totalUsersResponse;
    hosts?: totalHostsResponse;
    totalBookings?: totalBookingsResponse;
    totalIncome?: totalIncomeResponse;
    reviews?: allReviewsResponse[];
    recentActivities?: recentActivitiesResponse;
  }>;
}
