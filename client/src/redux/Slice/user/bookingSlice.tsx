import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBookingBase } from "@/utils/Types/user/commonDetails";

interface BookingState {
  currentBooking: IBookingBase | null;
}
const initialState: BookingState = {
  currentBooking: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBooking: (state, action: PayloadAction<IBookingBase>) => {
      state.currentBooking = action.payload;
    },
    clearBooking: (state) => {
      state.currentBooking = null;
    },
  },
});

export const { setBooking, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
