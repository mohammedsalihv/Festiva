import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface serviceSate {
  services: [];
}
const initialState: serviceSate = {
  services: [],
};

const serviceManagementSlice = createSlice({
  name: "serviceManagement",
  initialState,
  reducers: {
    setAllServices: (state, action: PayloadAction<[]>) => {
      state.services = action.payload;
    },
  },
});

export const { setAllServices } = serviceManagementSlice.actions;
export default serviceManagementSlice.reducer;
