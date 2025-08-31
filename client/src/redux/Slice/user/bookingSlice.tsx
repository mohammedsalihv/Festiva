import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBookingBase } from "@/utils/Types/user/commonDetails";
import { myBookings } from "@/utils/Types/user/userBookingsTypes";

interface BookingState {
  currentBooking: IBookingBase | null;
  bookings: myBookings[];
}

const initialState: BookingState = {
  currentBooking: null,
  bookings: [],
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
    clearBooking: (state) => {
      state.currentBooking = null;
    },
    clearAllMyBookings(state) {
      state.bookings = [];
    },
  },
});

export const { setBooking, setAllMyBookings, clearBooking , clearAllMyBookings } =
  bookingSlice.actions;
export default bookingSlice.reducer;
