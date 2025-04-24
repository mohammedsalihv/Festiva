import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HostState {
  hostInfo: {
    refreshToken: string;
    accessToken: string;
    role: "host";
    name: string;
    email: string;
    id: string;
  } | null;
}

const initialState: HostState = {
  hostInfo: localStorage.getItem("hostInfo")
    ? JSON.parse(localStorage.getItem("hostInfo") as string)
    : null,
};

const hostSlice = createSlice({
  name: "host",
  initialState,
  reducers: {
    setHostDetails: (state, action: PayloadAction<HostState["hostInfo"]>) => {
      state.hostInfo = action.payload;
      localStorage.setItem("hostInfo", JSON.stringify(action.payload));
    },
    logoutHost: (state) => {
      state.hostInfo = null;
      localStorage.removeItem("hostInfo");
    },
  },
});

export const { setHostDetails, logoutHost } = hostSlice.actions;
export default hostSlice.reducer;
