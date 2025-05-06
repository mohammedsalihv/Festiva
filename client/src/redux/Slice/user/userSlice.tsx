import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userInfo: {
    accessToken: string;
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    refreshToken: string;
    role: "admin" | "user";
    profilePhoto?: string;
    isVerified?: boolean;
  } | null;
}

const initialState: UserState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<Partial<UserState["userInfo"]>>) => {
      if (state.userInfo) {
        state.userInfo = {
          ...state.userInfo,
          ...action.payload,
        };
      } else {
        state.userInfo = action.payload as UserState["userInfo"];
      }
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    logoutUser: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setUserDetails, logoutUser } = userSlice.actions;
export default userSlice.reducer;
