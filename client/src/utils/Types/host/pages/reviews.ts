export interface reviewsState {
  _id: string;
  createrName: string;
  createrProfilePic: string;
  createrRole: string;
  rating: number;
  review: string;
}

export interface ReceivedReviewsState {
  reviews: reviewsState[];
}
