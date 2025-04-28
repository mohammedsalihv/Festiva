// locationFeaturesSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocationFeaturesState {
  features: string[];
  parkingFeatures: string[];
  venueDescription: string;
  terms: string;
  loading: boolean;
}

const initialState: LocationFeaturesState = {
  features: [],
  parkingFeatures: [],
  venueDescription: "",
  terms: "",
  loading: false,
};

// Create the slice
export const locationFormSlice = createSlice({
  name: "locationForm",
  initialState,
  reducers: {
    toggleFeature: (state, action: PayloadAction<string>) => {
      if (state.features.includes(action.payload)) {
        state.features = state.features.filter(f => f !== action.payload);
      } else if (state.features.length < 5) {
        state.features.push(action.payload);
      }
    },
    toggleParkingFeature: (state, action: PayloadAction<string>) => {
      if (state.parkingFeatures.includes(action.payload)) {
        state.parkingFeatures = state.parkingFeatures.filter(f => f !== action.payload);
      } else {
        state.parkingFeatures.push(action.payload);
      }
    },
    setVenueDescription: (state, action: PayloadAction<string>) => {
      state.venueDescription = action.payload;
    },
    setTerms: (state, action: PayloadAction<string>) => {
      state.terms = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAllLocationFeatures: (
      state,
      action: PayloadAction<Partial<LocationFeaturesState>> // Change to Partial for flexibility
    ) => {
      const { features, parkingFeatures, venueDescription, terms } = action.payload;
      if (features) state.features = features;
      if (parkingFeatures) state.parkingFeatures = parkingFeatures;
      if (venueDescription) state.venueDescription = venueDescription;
      if (terms) state.terms = terms;
    },
  },
});

export const { 
  toggleFeature, 
  toggleParkingFeature, 
  setVenueDescription, 
  setTerms, 
  setLoading,
  setAllLocationFeatures, 
} = locationFormSlice.actions;

export default locationFormSlice.reducer;

// Export the initial state as initialLocationFeaturesState
export const initialLocationFeaturesState = initialState;

