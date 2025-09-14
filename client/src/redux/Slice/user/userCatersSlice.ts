import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICatersBase } from "@/utils/Types/user/catersTypes";

const initialUserCatersStates: ICatersBase[] = [];

const userCatersSlice = createSlice({
  name: "userCaters",
  initialState: initialUserCatersStates,
  reducers: {
    setCaters: (state, action: PayloadAction<ICatersBase[]>) => {
      state.splice(0, state.length, ...action.payload);
    },

    resetCaters: () => {
      return initialUserCatersStates;
    },
  },
});

export const { setCaters, resetCaters } = userCatersSlice.actions;
export default userCatersSlice.reducer;
