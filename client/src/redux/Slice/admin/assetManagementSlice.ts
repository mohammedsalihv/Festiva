import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AssetDetail } from "@/utils/Types/admin/assetManagement/commonAssets";

interface AssetState {
  assets: AssetDetail[];
  assetDetails: AssetDetail | null;
}

const initialState: AssetState = {
  assets: [],
  assetDetails: null,
};

const assetManagement = createSlice({
  name: "assetManagement",
  initialState,
  reducers: {
    setAllAssets: (state, action: PayloadAction<AssetDetail[]>) => {
      state.assets = action.payload;
    },
    setAssetDetails: (state, action: PayloadAction<AssetDetail>) => {
      state.assetDetails = action.payload;
    },
    clearAssetDetails: (state) => {
      state.assetDetails = null;
    },
  },
});

export const { setAllAssets, setAssetDetails, clearAssetDetails } =
  assetManagement.actions;
export default assetManagement.reducer;
