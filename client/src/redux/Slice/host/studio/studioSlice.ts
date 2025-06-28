import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  studioFormState,
  initialStudioFormState,
} from "@/utils/Types/host/services/studio/studioForm.types";
import {
  studioDetailsFormState,
  initialStudioDetailsFormState,
} from "@/utils/Types/host/services/studio/studioDetailsForm.types";

interface StudioState {
  form: studioFormState;
  details: studioDetailsFormState;
}

const initialState: StudioState = {
  form: initialStudioFormState,
  details: initialStudioDetailsFormState,
};

const studioSlice = createSlice({
  name: "studio",
  initialState,
  reducers: {
    setStudioFormStates: (state, action: PayloadAction<studioFormState>) => {
      state.form = { ...state.form, ...action.payload };
    },
    setStudioDetailsFormStates: (
      state,
      action: PayloadAction<studioDetailsFormState>
    ) => {
      state.details = { ...state.details, ...action.payload };
    },
    resetStudioFormStates: (state) => {
      state.form = initialStudioFormState;
    },
    resetStudioDetailsFormStates: (state) => {
      state.details = initialStudioDetailsFormState;
    },
    resetAllStudioStates: () => initialState,
  },
});

export const {
  setStudioFormStates,
  setStudioDetailsFormStates,
  resetStudioFormStates,
  resetStudioDetailsFormStates,
  resetAllStudioStates,
} = studioSlice.actions;

export default studioSlice.reducer;
