import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRentCarBase } from "@/utils/Types/user/rentCarTypes";

const initialUserRentCarStates: IRentCarBase[] = [];

const userRentCarSlice = createSlice({
  name: "userRentcar",
  initialState: initialUserRentCarStates,
  reducers: {
    setRentCars: (state, action: PayloadAction<IRentCarBase[]>) => {
      return action.payload;
    },

    resetRentCars: () => {
      return initialUserRentCarStates;
    },
  },
});

export const { setRentCars, resetRentCars } = userRentCarSlice.actions;
export default userRentCarSlice.reducer;
