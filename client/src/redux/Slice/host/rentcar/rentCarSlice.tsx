

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  rentCarFormState,
  rentCarDetailsFormState,
  initialRentCarStates,
  initialRentCarDetailsStates,
} from "@/utils/validations/host/service/CarRentFormValidation";

interface RentCarState {
  form: rentCarFormState;
  details: rentCarDetailsFormState;
}

const initialState: RentCarState = {
  form: initialRentCarStates,
  details: initialRentCarDetailsStates,
};

const rentCarSlice = createSlice({
  name: "rentcar",
  initialState,
  reducers: {
    setRentCarForm: (state, action: PayloadAction<rentCarFormState>) => {
      state.form = { ...state.form, ...action.payload };
    },
    setRentCarDetails: (
      state,
      action: PayloadAction<rentCarDetailsFormState>
    ) => {
      state.details = { ...state.details, ...action.payload };
    },
    resetRentCarForm: (state) => {
      state.form = initialRentCarStates;
    },
    resetRentCarDetails: (state) => {
      state.details = initialRentCarDetailsStates;
    },
    resetAllRentCar: () => initialState,
  },
});

export const {
  setRentCarForm,
  setRentCarDetails,
  resetRentCarForm,
  resetRentCarDetails,
  resetAllRentCar,
} = rentCarSlice.actions;

export default rentCarSlice.reducer;
