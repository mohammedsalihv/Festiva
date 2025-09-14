import { IReview } from "../../../entities/databaseModelInterfaces/baseModelInterfaces/interface.review";

export interface IReviewRepository {
  addReview(reviewDetails: IReview): Promise<boolean>;
  getAllReviews(): Promise<IReview[]>;
}
