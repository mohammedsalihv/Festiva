import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface VenueDetailsState {
  venueName: string;
  rent: number | null;
  capacity: number | null;
  shift: string;
  squareFeet: number | null;
  timeSlots: string[];
  availableDates: string[];
  description: string;
}

export const initialVenueDetailsState: VenueDetailsState = {
  venueName: "",
  rent: null,
  capacity: null,
  shift: "",
  squareFeet: null,
  timeSlots: [],
  availableDates: [],
  description: "",
};

const venueDetailsSlice = createSlice({
  name: "venueDetails",
  initialState: initialVenueDetailsState,
  reducers: {
    setVenueDetails: (state, action: PayloadAction<VenueDetailsState>) => {
      return { ...state, ...action.payload };
    },
    resetVenueDetails: () => initialVenueDetailsState,
  },
});

export const { setVenueDetails, resetVenueDetails } = venueDetailsSlice.actions;

export default venueDetailsSlice.reducer;
