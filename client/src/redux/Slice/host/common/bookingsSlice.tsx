import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  receivedBookings,
  ReceivedBookingsState,
} from "@/utils/Types/host/pages/bookings";

const initialState: ReceivedBookingsState = {
  bookings: [],
};

const receivedBookingsSlice = createSlice({
  name: "receivedBookings",
  initialState,
  reducers: {
    setAllBookings(state, action: PayloadAction<receivedBookings[]>) {
      state.bookings = action.payload;
    },
    clearBookings(state) {
      state.bookings = [];
    },
  },
});

export const { setAllBookings, clearBookings } = receivedBookingsSlice.actions;

export default receivedBookingsSlice.reducer;
