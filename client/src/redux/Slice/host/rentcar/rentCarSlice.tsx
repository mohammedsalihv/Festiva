import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rentCarFormState , initialRentCarStates } from "@/utils/validations/host/service/CarRentFormValidation";

const initialRentCarState: rentCarFormState = initialRentCarStates;

const rentCarSlice = createSlice({
  name: "rentcar",
  initialState: initialRentCarState,
  reducers: {
    setRentCarDetails: (state, action: PayloadAction<rentCarFormState>) => {
      return { ...state, ...action.payload };
    },
    resetRentCarDetails: () => initialRentCarState,
  },
});

export const { setRentCarDetails, resetRentCarDetails } = rentCarSlice.actions;
export default rentCarSlice.reducer;
