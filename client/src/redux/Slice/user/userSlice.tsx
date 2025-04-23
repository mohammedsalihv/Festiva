import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userInfo: {
    accessToken: string;
    refreshToken: string;
    role: "admin" | "user" | "host";
    isVerified?: boolean;
  } | null;
}

const initialState: UserState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    :null,
};


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserDetails:(state , action : PayloadAction<UserState["userInfo"]> )=>{
            state.userInfo = action.payload
            localStorage.setItem("userInfo" , JSON.stringify(action.payload))
        },
        logoutUser:(state)=>{
          state.userInfo = null;
          localStorage.removeItem("userInfo")
        }
    }
})

export const { setUserDetails , logoutUser} = userSlice.actions;
export default userSlice.reducer;