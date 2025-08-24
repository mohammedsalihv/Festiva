
import { IReview } from "../../../entities/modelInterface/base/interface.review";

export interface IReviewUseCase {
  newReview(review: IReview): Promise<boolean>;
}
