import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminState } from "@/utils/Types/admin/authTypes";

const initialState: AdminState = {
  adminInfo: localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo") as string)
    : null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminDetails: (
      state,
      action: PayloadAction<Partial<AdminState["adminInfo"]>>
    ) => {
      if (state.adminInfo) {
        state.adminInfo = {
          ...state.adminInfo,
          ...action.payload,
        };
      } else {
        state.adminInfo = action.payload as AdminState["adminInfo"];
      }
      localStorage.setItem("adminInfo", JSON.stringify(state.adminInfo));
    },
    logoutAdmin: (state) => {
      state.adminInfo = null;
      localStorage.removeItem("adminInfo");
    },
  },
});

export const { setAdminDetails, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
