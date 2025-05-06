import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {User} from "@/utils/types"

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    setAllUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setAllUsers } = userManagementSlice.actions;
export default userManagementSlice.reducer;
