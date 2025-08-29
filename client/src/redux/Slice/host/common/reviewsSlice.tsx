import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ReceivedReviewsState,
  reviewsState,
} from "@/utils/Types/host/pages/reviews";

const initialState: ReceivedReviewsState = {
  reviews: [],
};

const receivedReviewsSlice = createSlice({
  name: "receivedReviews",
  initialState,
  reducers: {
    setAllReviews(state, action: PayloadAction<reviewsState[]>) {
      state.reviews = action.payload;
    },
    clearReviews(state) {
      state.reviews = [];
    },
  },
});

export const { setAllReviews, clearReviews } = receivedReviewsSlice.actions;

export default receivedReviewsSlice.reducer;
