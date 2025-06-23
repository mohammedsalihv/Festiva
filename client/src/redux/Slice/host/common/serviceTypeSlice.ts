import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type serviceTypes = "venue"|"rentcar"|"studio"|"caters"

const serviceTypeSlice = createSlice({
  name: "serviceType",
  initialState: "venue",
  reducers: {
    setServiceType: (_, action: PayloadAction<string>) => action.payload,
  },
});

export const { setServiceType } = serviceTypeSlice.actions;
export default serviceTypeSlice.reducer;
