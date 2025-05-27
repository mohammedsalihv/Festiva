import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageState {
  croppedImages: File[];
}

const initialState: ImageState = {
  croppedImages: [],
};

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    addCroppedImage: (state, action: PayloadAction<File>) => {
      state.croppedImages.push(action.payload);
    },
    removeImage: (state, action: PayloadAction<number>) => {
      state.croppedImages.splice(action.payload, 1);
    },
    setAllImages: (state, action: PayloadAction<File[]>) => {
      state.croppedImages = action.payload;
    },
    clearImages: (state) => {
      state.croppedImages = [];
    },
  },
});

export const { addCroppedImage, removeImage, setAllImages, clearImages } =
  imageSlice.actions;
export default imageSlice.reducer;
export const initialImageState = initialState;
