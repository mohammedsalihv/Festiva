import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  studioFormState,
  studioPackageState,
  initialStudioFormState,
  initialStudioPackageState,
  studioPackage,
} from "@/utils/Types/host/services/studioTypess";

interface StudioState {
  form: studioFormState;
  packages: studioPackageState;
}

const initialState: StudioState = {
  form: initialStudioFormState,
  packages: initialStudioPackageState,
};

const studioSlice = createSlice({
  name: "studio",
  initialState,
  reducers: {
    setStudioFormStates: (state, action: PayloadAction<studioFormState>) => {
      state.form = { ...state.form, ...action.payload };
    },
    setStudioPackagesStates: (
      state,
      action: PayloadAction<studioPackageState>
    ) => {
      state.packages = { ...state.packages, ...action.payload };
    },
    updateStudioPackagesList: (
      state,
      action: PayloadAction<studioPackage[]>
    ) => {
      state.packages.packages = action.payload;
    },
    updateStudioServiceFeatures: (state, action: PayloadAction<string[]>) => {
      state.packages.serviceFeatures = action.payload;
    },
    resetStudioFormStates: (state) => {
      state.form = initialStudioFormState;
    },
    resetStudioPackagesStates: (state) => {
      state.packages = initialStudioPackageState;
    },
    resetAllStudioStates: () => initialState,
  },
});

export const {
  setStudioFormStates,
  setStudioPackagesStates,
  updateStudioPackagesList,
  updateStudioServiceFeatures,
  resetStudioFormStates,
  resetStudioPackagesStates,
  resetAllStudioStates,
} = studioSlice.actions;

export default studioSlice.reducer;
