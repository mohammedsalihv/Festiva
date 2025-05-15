import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Host } from "@/utils/types";

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
      const index = state.hosts.findIndex(
        (host) => host._id === updateHost._id
      );
      if (index !== -1) {
        state.hosts[index] = updateHost;
      }
    },
  },
});

export const { setAllHosts, updateHost } = hostManagementSlice.actions;
export default hostManagementSlice.reducer;
