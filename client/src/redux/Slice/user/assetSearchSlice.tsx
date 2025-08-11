import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LocationType {
  lat: number;
  lng: number;
  label: string;
}

interface AssetSearchState {
  selectedLocation: LocationType | null;
  filters: Record<string, any>;
}

const initialState: AssetSearchState = {
  selectedLocation: null,
  filters: {},
};

const assetSearchSlice = createSlice({
  name: "assetSearch",
  initialState,
  reducers: {
    setSelectedLocation(state, action: PayloadAction<LocationType>) {
      state.selectedLocation = action.payload;
    },
    setFilters(state, action: PayloadAction<Record<string, any>>) {
      console.log("Setting filters with payload:", action.payload); // Debug payload
      state.filters = action.payload; // Replace, don’t merge
    },
    clearFilters(state) {
      console.log("Clearing filters"); // Debug
      state.filters = {};
      state.selectedLocation = null;
    },
  },
});

export const { setSelectedLocation, setFilters, clearFilters } = assetSearchSlice.actions;

export default assetSearchSlice.reducer;
