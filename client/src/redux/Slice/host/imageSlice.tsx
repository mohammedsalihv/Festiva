// imageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImageState {
  croppedImages: string[];
}

const initialState: ImageState = {
  croppedImages: [],
};

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    addCroppedImage: (state, action: PayloadAction<string>) => {
      state.croppedImages.push(action.payload); // Save one image at a time
    },
    removeImage: (state, action: PayloadAction<number>) => {
      state.croppedImages.splice(action.payload, 1);
    },
    setAllImages: (state, action: PayloadAction<string[]>) => {
      state.croppedImages = action.payload; // Correctly replace all images if needed
    },
    clearImages: (state) => {
      state.croppedImages = [];
    },
  },
});

export const { addCroppedImage, removeImage, setAllImages, clearImages } = imageSlice.actions;

export default imageSlice.reducer;

// Export the initial state as initialImageState
export const initialImageState = initialState;
