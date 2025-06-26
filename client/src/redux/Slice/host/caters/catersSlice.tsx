import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CatersDetailsFormState,
  CatersFormState,
  initialCatersDetailsFormState,
  initialCatersFormState,
} from "@/utils/Types/host/services/catersTypes";

interface catersState {
  form: CatersFormState;
  details: CatersDetailsFormState;
}

const initialCatersState: catersState = {
  form: initialCatersFormState,
  details: initialCatersDetailsFormState,
};

const catersFormSlice = createSlice({
  name: "caters",
  initialState: initialCatersState,
  reducers: {
    setCatersForm: (state, action: PayloadAction<CatersFormState>) => {
      state.form = { ...action.payload };
    },
    setCatersDetailsForm: (
      state,
      action: PayloadAction<CatersDetailsFormState>
    ) => {
      state.details = { ...action.payload };
    },
    resetCatersForm: (state) => {
      state.form = initialCatersFormState;
    },
    resetCatersDetailsForm: (state) => {
      state.details = initialCatersDetailsFormState;
    },
    resetAllCatersStates: () => initialCatersState,
  },
});

export const {
  setCatersForm,
  setCatersDetailsForm,
  resetCatersForm,
  resetCatersDetailsForm,
  resetAllCatersStates,
} = catersFormSlice.actions;

export default catersFormSlice.reducer;
