import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageState {
  croppedImages: string[]; 
}

const initialState: ImageState = {
  croppedImages: [],
};

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {

    addCroppedImage: (state, action: PayloadAction<string>) => {
      state.croppedImages.push(action.payload);  
    },
    removeImage: (state, action: PayloadAction<number>) => {
      state.croppedImages.splice(action.payload, 1);
    },
   
    setAllImages: (state, action: PayloadAction<string[]>) => {
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
