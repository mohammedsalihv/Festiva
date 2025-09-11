import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStudioBase } from "@/utils/Types/user/studioTypes";

const initialUserStudioStates: IStudioBase[] = [];

const userStudioSlice = createSlice({
  name: "userStudio",
  initialState: initialUserStudioStates,
  reducers: {
    setStudios: (state, action: PayloadAction<IStudioBase[]>) => {
      return action.payload;
    },

    resetStudios: () => {
      return initialUserStudioStates;
    },
  },
});

export const { setStudios, resetStudios } = userStudioSlice.actions;
export default userStudioSlice.reducer;
