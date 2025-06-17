import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assetDetailTypes } from "@/utils/Types/admin/assetManagement/commonAssets";

interface AssetState {
  allAssets: assetDetailTypes[];
  singleAsset: assetDetailTypes | null;
}

const initialState: AssetState = {
  allAssets: [],
  singleAsset: null,
};

const assetManagement = createSlice({
  name: "assetManagement",
  initialState,
  reducers: {
    setAllAssets: (state, action: PayloadAction<assetDetailTypes[]>) => {
      state.allAssets = action.payload;
    },
    setSingleAssetDetails: (state, action: PayloadAction<assetDetailTypes>) => {
      state.singleAsset = action.payload;
    },
    clearSingleAssetDetails: (state) => {
      state.singleAsset = null;
    },
    clearAllAssets: () => initialState,
  },
});

export const {
  setAllAssets,
  setSingleAssetDetails,
  clearSingleAssetDetails,
  clearAllAssets,
} = assetManagement.actions;
export default assetManagement.reducer;
