import { Types } from "mongoose";
import {
  AssetOverviewItem,
  BookingStatsResponse,
  BookingTableRow,
  RecentBooking,
  RevenueAndPaymentsResponse,
} from "../../../../types/DTO's/hostDTO's/hostAccountDTO's/dto.hostDashbaord";

export interface IHostDashboardUseCase {
  dashboard(hostId: string | Types.ObjectId): Promise<{
    revenues?: RevenueAndPaymentsResponse[];
    assetOverview?: AssetOverviewItem[];
    bookingStatistics?: BookingStatsResponse;
    recentBookings?: RecentBooking[];
    bookingTable?: BookingTableRow[];
  }>;
}
