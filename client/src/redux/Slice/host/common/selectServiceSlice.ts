import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTab: "Venue",
  selectedOption: "Wedding",
};

const selectServiceSlice = createSlice({
  name: "selectService",
  initialState,
  reducers: {
    setSelectedTab(state, action) {
      state.selectedTab = action.payload;
    },
    setSelectedOption(state, action) {
      state.selectedOption = action.payload;
    },
    resetSelectedTab(state) {
      state.selectedTab = initialState.selectedTab;
    },
    resetSelectedOption(state) {
      state.selectedOption = initialState.selectedOption;
    },
    resetAllService(state) {
      state.selectedTab = initialState.selectedTab;
      state.selectedOption = initialState.selectedOption;
    },
  },
});

export const { 
  setSelectedTab, 
  setSelectedOption, 
  resetSelectedTab, 
  resetSelectedOption,
  resetAllService
} = selectServiceSlice.actions;

export default selectServiceSlice.reducer;
