import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { myAssetsCard } from "@/utils/Types/host/pages/myAssets";

interface MyAssetsState {
  assets: myAssetsCard[];
}

const initialState: MyAssetsState = {
  assets: [],
};

const myAssetsSlice = createSlice({
  name: "myAssets",
  initialState,
  reducers: {
    setMyAssets(state, action: PayloadAction<myAssetsCard[]>) {
      state.assets = action.payload;
    },
  },
});

export const { setMyAssets } = myAssetsSlice.actions;
export default myAssetsSlice.reducer;
