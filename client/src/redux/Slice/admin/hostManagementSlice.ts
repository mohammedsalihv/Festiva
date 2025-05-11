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
  },
});

export const { setAllHosts } = hostManagementSlice.actions;
export default hostManagementSlice.reducer;
