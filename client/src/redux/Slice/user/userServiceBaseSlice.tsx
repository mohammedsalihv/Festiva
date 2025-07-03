import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAsset } from "@/utils/Types/user/commonDetails";

interface AssetDetailsState {
  data: IAsset | null;
}

const initialState: AssetDetailsState = {
  data: null,
};

const assetDetailsSlice = createSlice({
  name: "assetDetails",
  initialState,
  reducers: {
    setServiceDetails(state, action: PayloadAction<IAsset>) {
      state.data = action.payload;
    },
    clearServiceDetails(state) {
      state.data = null;
    },
  },
});

export const { setServiceDetails, clearServiceDetails } =
  assetDetailsSlice.actions;
export default assetDetailsSlice.reducer;
