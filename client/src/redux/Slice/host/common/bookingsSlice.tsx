import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  receivedBookings,
  BookingsState,
} from "@/utils/Types/host/pages/bookings";

const initialState: BookingsState = {
  bookings: [],
  loading: false,
  error: null,
};

const receivedBookingsSlice = createSlice({
  name: "recivedBookings",
  initialState,
  reducers: {
    setAllBookings(state, action: PayloadAction<receivedBookings[]>) {
      state.bookings = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearBookings(state) {
      state.bookings = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setAllBookings, clearBookings } =
  receivedBookingsSlice.actions;

export default receivedBookingsSlice.reducer;
