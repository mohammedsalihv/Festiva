import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RevenueAndPaymentsResponse,
  AssetOverviewResponse,
  BookingStatsResponse,
  RecentBooking,
  BookingTableRow,
  HostDashboardState,
} from "@/utils/Types/host/pages/hostDashboard";

const initialState: HostDashboardState = {
  revenue: null,
  assetOverview: [],
  bookingStats: [],
  recentBookings: [],
  bookingTableRows: [],
};

const hostDashboardSlice = createSlice({
  name: "hostDashboard",
  initialState,
  reducers: {
    setRevenue(state, action: PayloadAction<RevenueAndPaymentsResponse>) {
      state.revenue = action.payload;
    },
    setAssetOverview(state, action: PayloadAction<AssetOverviewResponse>) {
      state.assetOverview = action.payload;
    },
    setBookingStats(state, action: PayloadAction<BookingStatsResponse>) {
      state.bookingStats = action.payload;
    },
    setRecentBookings(state, action: PayloadAction<RecentBooking[]>) {
      state.recentBookings = action.payload;
    },
    setBookingTableRows(state, action: PayloadAction<BookingTableRow[]>) {
      state.bookingTableRows = action.payload;
    },
    clearDashboard(state) {
      state.revenue = null;
      state.assetOverview = [];
      state.bookingStats = [];
      state.recentBookings = [];
      state.bookingTableRows = [];
    },
  },
});

export const {
  setRevenue,
  setAssetOverview,
  setBookingStats,
  setRecentBookings,
  setBookingTableRows,
  clearDashboard,
} = hostDashboardSlice.actions;

export default hostDashboardSlice.reducer;
