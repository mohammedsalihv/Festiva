export interface RevenueMonth {
  month: string;
  revenue: number;
}
export interface RevenueAndPaymentsResponse {
  revenueByMonth: RevenueMonth[];
  total: number;
  platformFee: number;
  gross: number;
}


export interface AssetOverviewItem {
  assetType: string;
  assetCount: number;
}
export type AssetOverviewResponse = AssetOverviewItem[];



export interface BookingStatItem {
  status: string;
  count: number;
}
export type BookingStatsResponse = BookingStatItem[];

export interface RecentBooking {
  id: string;
  user: string;
  service: string;
  amount: number;
  status: "accepted" | "pending" | "rejected";
}

export interface BookingTableRow {
  id: string; 
  user: string;
  service: string;
  type: string;
  status: "accepted" | "pending" | "rejected";
  date: string; 
  amount: number;
  platformFee: number;
}


export interface HostDashboardState {
  revenue: RevenueAndPaymentsResponse[];
  assetOverview: AssetOverviewResponse;
  bookingStats: BookingStatsResponse;
  recentBookings: RecentBooking[];
  bookingTableRows: BookingTableRow[];
}