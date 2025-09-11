import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  venueFormState,
  venueDetailsFormState,
  venueFormInitialState,
  venueDetailsFormInitialState,
} from "@/utils/Types/host/services/venueTypes";

interface venuState {
  form: venueFormState;
  details: venueDetailsFormState;
}

const initialVenueState: venuState = {
  form: venueFormInitialState,
  details: venueDetailsFormInitialState,
};

const venueSlice = createSlice({
  name: "venue",
  initialState: initialVenueState,
  reducers: {
    setVenueForm: (state, action: PayloadAction<venueFormState>) => {
      state.form = { ...action.payload };
    },
    setVenueDetailsForm: (
      state,
      action: PayloadAction<venueDetailsFormState>
    ) => {
      state.details = { ...action.payload };
    },
    resetVenueForm: (state) => {
      state.form = venueFormInitialState;
    },
    resetVenueDetailsForm: (state) => {
      state.details = venueDetailsFormInitialState;
    },
    resetAllVenueStates: () => initialVenueState,
  },
});

export const {
  setVenueForm,
  setVenueDetailsForm,
  resetVenueForm,
  resetVenueDetailsForm,
  resetAllVenueStates,
} = venueSlice.actions;

export default venueSlice.reducer;
