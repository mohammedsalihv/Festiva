import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBookingBase } from "@/utils/Types/user/commonDetails";
import {
  myBookings,
  bookingDetails,
} from "@/utils/Types/user/userBookingsTypes";

interface BookingState {
  currentBooking: IBookingBase | null;
  bookings: myBookings[];
  bookingDetails: bookingDetails | null;
}

const initialState: BookingState = {
  currentBooking: null,
  bookings: [],
  bookingDetails: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBooking: (state, action: PayloadAction<IBookingBase>) => {
      state.currentBooking = action.payload;
    },
    setAllMyBookings: (state, action: PayloadAction<myBookings[]>) => {
      state.bookings = action.payload;
    },
    setBookingDetails: (
      state,
      action: PayloadAction<bookingDetails | null>
    ) => {
      state.bookingDetails = action.payload;
    },
    clearBookingDetails: (state) => {
      state.bookingDetails = null;
    },
    clearBooking: (state) => {
      state.currentBooking = null;
    },
    clearAllMyBookings(state) {
      state.bookings = [];
    },
  },
});

export const {
  setBooking,
  setAllMyBookings,
  setBookingDetails,
  clearBookingDetails,
  clearBooking,
  clearAllMyBookings,
} = bookingSlice.actions;
export default bookingSlice.reducer;
