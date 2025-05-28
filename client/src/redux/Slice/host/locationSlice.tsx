import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface locationDetailsState {
  houseNo: string;
  street: string;
  district: string;
  state: string;
  country: string;
  zip: string;
}

export const initialLocationDetailsState: locationDetailsState = {
  houseNo: "",
  street: "",
  district: "",
  state: "",
  country: "",
  zip: "",
};

export const locationDetailsFormState = createSlice({
  name: "locationDetails",
  initialState: initialLocationDetailsState,
  reducers: {
    setLocationDetails: (
      state,
      action: PayloadAction<Partial<locationDetailsState>>
    ) => {
      return { ...state, ...action.payload };
    },
    resetLocationDetails: () => initialLocationDetailsState,
  },
});

export const { setLocationDetails , resetLocationDetails} = locationDetailsFormState.actions;

export default locationDetailsFormState.reducer;
