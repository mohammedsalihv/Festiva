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
      state.croppedImages.push(action.payload);
    },
    removeImage: (state, action: PayloadAction<number>) => {
      state.croppedImages.splice(action.payload, 1);
    },
  },
});

export const { addCroppedImage, removeImage } = imageSlice.actions;
export default imageSlice.reducer;
