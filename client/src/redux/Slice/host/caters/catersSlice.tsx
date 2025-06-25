import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CatersDetailsFormState,
  CatersFormState,
  initialCatersDetailsFormState,
  initialCatersFormState,
} from "@/utils/Types/host/services/catersTypes";

interface catersState {
  form: CatersFormState;
  features: CatersDetailsFormState;
}

const initialCatersState: catersState = {
  form: initialCatersFormState,
  features: initialCatersDetailsFormState,
};

const catersSlice = createSlice({
  name: "caters",
  initialState: initialCatersState,
  reducers: {
    setCatersForm: (state, action: PayloadAction<CatersFormState>) => {
      state.form = { ...action.payload };
    },
    setCatersDetails: (
      state,
      action: PayloadAction<CatersDetailsFormState>
    ) => {
      state.features = { ...action.payload };
    },
    resetCatersForm: (state) => {
      state.form = initialCatersFormState;
    },
    resetCatersDetails: (state) => {
      state.features = initialCatersDetailsFormState;
    },
    resetAllCatersStates: () => initialCatersState,
  },
});

export const {
  setCatersForm,
  setCatersDetails,
  resetCatersForm,
  resetCatersDetails,
  resetAllCatersStates,
} = catersSlice.actions;

export default catersSlice.reducer;
