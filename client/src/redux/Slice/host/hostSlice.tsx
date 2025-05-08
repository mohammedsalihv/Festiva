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
    setHostDetails: (
      state,
      action: PayloadAction<Partial<HostState["hostInfo"]>>
    ) => {
      if (state.hostInfo) {
        state.hostInfo = {
          ...state.hostInfo,
          ...action.payload,
        };
      } else {
        state.hostInfo = action.payload as HostState["hostInfo"];
      }
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
