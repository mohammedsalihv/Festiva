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
  userProfile:string;
  userName: string;
  serviceType: string;
  totalAmount: number;
  bookingStatus: "accepted" | "pending" | "rejected";
}

export interface BookingTableRow {
  _id: string;
  userName: string;
  profilePic: string;
  type: string;
  status: "accepted" | "pending" | "rejected";
  date: string;
  amount: number;
  platformFee: number;
}
