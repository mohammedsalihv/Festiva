import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/utils/Types/user/authTypes";

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
    updateUser: (state, action: PayloadAction<User>) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex(user => user._id === updatedUser._id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    },
  },
});

export const { setAllUsers, updateUser } = userManagementSlice.actions;
export default userManagementSlice.reducer;
