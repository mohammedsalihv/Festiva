import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  adminBookingsState,
  allBookingsState,
} from "@/utils/Types/admin/bookingManagementTypes";

const initialState: allBookingsState = {
  bookings: [],
};

const adminBookingsSlice = createSlice({
  name: "adminBookings",
  initialState,
  reducers: {
    setAllAdminBookings(state, action: PayloadAction<adminBookingsState[]>) {
      state.bookings = action.payload;
    },
    clearAllAdminBookings(state) {
      state.bookings = [];
    },
  },
});

export const { setAllAdminBookings, clearAllAdminBookings } =
  adminBookingsSlice.actions;

export default adminBookingsSlice.reducer;
