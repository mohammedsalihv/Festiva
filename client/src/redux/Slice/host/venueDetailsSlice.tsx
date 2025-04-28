import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface VenueDetailsState {
  name: string;
  rent: number | null;
  capacity: number | null;
  shift: string;
  squareFeet: number | null;
  timeSlots: string[];
  availableDates: string[];
  details: string;
}

export const initialVenueDetailsState: VenueDetailsState = {
  name: "",
  rent: null,
  capacity: null,
  shift: "",
  squareFeet: null,
  timeSlots: [],
  availableDates: [],
  details: "",
};

const venueDetailsSlice = createSlice({
  name: "venueDetails",
  initialState: initialVenueDetailsState,
  reducers: {
    setVenueDetails: (state, action: PayloadAction<VenueDetailsState>) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => initialVenueDetailsState,
  },
});

export const { setVenueDetails, resetForm } = venueDetailsSlice.actions;

export default venueDetailsSlice.reducer;
