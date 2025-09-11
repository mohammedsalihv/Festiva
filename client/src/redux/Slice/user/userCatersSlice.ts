import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICatersBase } from "@/utils/Types/user/catersTypes";

const initialUserCatersStates: ICatersBase[] = [];

const userCatersSlice = createSlice({
  name: "userCaters",
  initialState: initialUserCatersStates,
  reducers: {
    setCaters: (state, action: PayloadAction<ICatersBase[]>) => {
      return action.payload;
    },

    resetCaters: () => {
      return initialUserCatersStates;
    },
  },
});

export const { setCaters, resetCaters } = userCatersSlice.actions;
export default userCatersSlice.reducer;
