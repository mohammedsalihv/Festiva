import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface assetState {
  assets: [];
  assetDetails: [];
}
const initialState: assetState = {
  assets: [],
  assetDetails: [],
};

const assetManagement = createSlice({
  name: "assetManagement",
  initialState,
  reducers: {
    setAllAssets: (state, action: PayloadAction<[]>) => {
      state.assets = action.payload;
    },
    setAssetDetails: (state, action: PayloadAction<[]>) => {
      state.assetDetails = action.payload;
    },
    clearAssetDetails: () => initialState,
  },
});

export const { setAllAssets, setAssetDetails , clearAssetDetails} = assetManagement.actions;
export default assetManagement.reducer;
