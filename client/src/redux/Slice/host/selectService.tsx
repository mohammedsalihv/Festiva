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
  },
});

export const { setSelectedTab, setSelectedOption } = selectServiceSlice.actions;
export default selectServiceSlice.reducer;
