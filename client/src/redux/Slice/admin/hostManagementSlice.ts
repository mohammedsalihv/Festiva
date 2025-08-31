import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Host } from "@/utils/Types/host/authTypes";

interface hostSate {
  hosts: Host[];
}

const initialState: hostSate = {
  hosts: [],
};

const hostManagementSlice = createSlice({
  name: "hostManagement",
  initialState,
  reducers: {
    setAllHosts: (state, action: PayloadAction<Host[]>) => {
      state.hosts = action.payload;
    },
    updateHost: (state, action: PayloadAction<Host>) => {
      const updateHost = action.payload;
      const index = state.hosts.findIndex((host) => host.id === updateHost.id);
      if (index !== -1) {
        state.hosts[index] = updateHost;
      }
    },
    clearAllHosts: (state) => {
      state.hosts = [];
    },
  },
});

export const { setAllHosts, updateHost, clearAllHosts } =
  hostManagementSlice.actions;
export default hostManagementSlice.reducer;
