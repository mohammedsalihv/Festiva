
import { IReview } from "../../../entities/databaseModelInterfaces/baseModelInterfaces/interface.review";

export interface IReviewUseCase {
  newReview(review: IReview): Promise<boolean>;
}
