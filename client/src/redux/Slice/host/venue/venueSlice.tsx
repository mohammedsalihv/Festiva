import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  venueFeatures,
  venueFeaturesInitialState,
  VenueDetails,
  venueDetailsInitialState,
} from "@/utils/Types/host/services/venueTypes";

interface venuState {
  form: VenueDetails;
  features: venueFeatures;
}

const initialVenueState: venuState = {
  form: venueDetailsInitialState,
  features: venueFeaturesInitialState,
};

const venueSlice = createSlice({
  name: "venue",
  initialState: initialVenueState,
  reducers: {
    setVenueDetails: (state, action: PayloadAction<VenueDetails>) => {
      state.form = {  ...action.payload };
    },
    setVenueFeatures: (state, action: PayloadAction<venueFeatures>) => {
      state.features = {  ...action.payload };
    },
    resetVenueDetails: (state) => {
      state.form = venueDetailsInitialState;
    },
    resetVenueFeatures: (state) => {
      state.features = venueFeaturesInitialState;
    },
    resetAllVenueStates: () => initialVenueState,
  },
});

export const { setVenueDetails , setVenueFeatures, resetVenueDetails , resetVenueFeatures , resetAllVenueStates } = venueSlice.actions;

export default venueSlice.reducer;
