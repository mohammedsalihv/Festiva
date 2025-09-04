import { IReview } from "../../modelInterface/base/interface.review";

export interface IReviewRepository {
  addReview(reviewDetails: IReview): Promise<boolean>;
  getAllReviews(): Promise<IReview[]>;
}
