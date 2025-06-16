import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationFeaturesState } from "@/utils/validations/host/service/locationFeatures";

const initialState: LocationFeaturesState = {
  features: [],
  parkingFeatures: [],
  about: "",
  terms: "",
};

export const locationFormSlice = createSlice({
  name: "locationForm",
  initialState,
  reducers: {
    setLocationFeatures: (
      state,
      action: PayloadAction<LocationFeaturesState>
    ) => {
      return { ...state, ...action.payload };
    },
    resetLocationFeatures: () => initialState,
  },
});

export const { setLocationFeatures, resetLocationFeatures } =
  locationFormSlice.actions;

export default locationFormSlice.reducer;
export const initialLocationFeaturesState = initialState;
