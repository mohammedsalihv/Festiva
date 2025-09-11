import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HostState {
  hostInfo: {
    id: string;
    name: string;
    email: string;
    phone: string;
    profilePic: string;
    role: "host";
    refreshToken: string;
    accessToken: string;
  } | null;
}

const initialState: HostState = {
  hostInfo:
    typeof window !== "undefined" && localStorage.getItem("hostInfo")
      ? (() => {
          try {
            return JSON.parse(localStorage.getItem("hostInfo") as string);
          } catch (error) {
            console.error("Failed to parse hostInfo from localStorage", error);
            return null;
          }
        })()
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
