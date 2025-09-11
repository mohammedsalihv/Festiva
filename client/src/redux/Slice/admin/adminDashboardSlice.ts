import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  revenueCards,
  serviceStatics,
  serviceOverviews,
  totalUsers,
  totalHosts,
  totalBookings,
  totalIncome,
  recentActivities,
  allReviews,
} from "@/utils/Types/admin/adminDashboardTypes";

export interface DashboardState {
  revenueCards: revenueCards[];
  serviceStatics: serviceStatics | null;
  serviceOverviews: serviceOverviews | null;
  totalUsers: totalUsers | null;
  totalHosts: totalHosts | null;
  totalBookings: totalBookings | null;
  totalIncome: totalIncome | null;
  recentActivities: recentActivities | null;
  allReviews: allReviews[];
}

const initialState: DashboardState = {
  revenueCards: [],
  serviceStatics: null,
  serviceOverviews: null,
  totalUsers: null,
  totalHosts: null,
  totalBookings: null,
  totalIncome: null,
  recentActivities: null,
  allReviews: [],
};

const dashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {
    setRevenueCards: (state, action: PayloadAction<revenueCards[]>) => {
      state.revenueCards = action.payload;
    },
    clearRevenueCards: (state) => {
      state.revenueCards = [];
    },

    setServiceStatics: (state, action: PayloadAction<serviceStatics>) => {
      state.serviceStatics = action.payload;
    },
    clearServiceStatics: (state) => {
      state.serviceStatics = null;
    },

    setServiceOverviews: (state, action: PayloadAction<serviceOverviews>) => {
      state.serviceOverviews = action.payload;
    },
    clearServiceOverviews: (state) => {
      state.serviceOverviews = null;
    },

    setTotalUsers: (state, action: PayloadAction<totalUsers>) => {
      state.totalUsers = action.payload;
    },
    clearTotalUsers: (state) => {
      state.totalUsers = null;
    },

    setTotalHosts: (state, action: PayloadAction<totalHosts>) => {
      state.totalHosts = action.payload;
    },
    clearTotalHosts: (state) => {
      state.totalHosts = null;
    },

    setTotalBookings: (state, action: PayloadAction<totalBookings>) => {
      state.totalBookings = action.payload;
    },
    clearTotalBookings: (state) => {
      state.totalBookings = null;
    },

    setTotalIncome: (state, action: PayloadAction<totalIncome>) => {
      state.totalIncome = action.payload;
    },
    clearTotalIncome: (state) => {
      state.totalIncome = null;
    },

    setRecentActivities: (state, action: PayloadAction<recentActivities>) => {
      state.recentActivities = action.payload;
    },
    clearRecentActivities: (state) => {
      state.recentActivities = null;
    },

    setAllReviews: (state, action: PayloadAction<allReviews[]>) => {
      state.allReviews = action.payload;
    },
    clearAllReviews: (state) => {
      state.allReviews = [];
    },

    clearAdminDashboard: () => initialState,
  },
});

export const {
  setRevenueCards,
  clearRevenueCards,
  setServiceStatics,
  clearServiceStatics,
  setServiceOverviews,
  clearServiceOverviews,
  setTotalUsers,
  clearTotalUsers,
  setTotalHosts,
  clearTotalHosts,
  setTotalBookings,
  clearTotalBookings,
  setTotalIncome,
  clearTotalIncome,
  setRecentActivities,
  clearRecentActivities,
  setAllReviews,
  clearAllReviews,
  clearAdminDashboard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
