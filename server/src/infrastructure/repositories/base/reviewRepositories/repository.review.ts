import { IReview } from "../../../../domain/entities/modelInterface/base/interface.review";
import { IReviewRepository } from "../../../../domain/entities/repositoryInterface/base/interface.reviewRepository";
import { reviewModel } from "../../../../domain/models/base/review/reviewModel";

export class ReviewRepository implements IReviewRepository {
  async addReview(reviewDetails: IReview): Promise<boolean> {
    const review = new reviewModel(reviewDetails);
    await review.save();
    return true;
  }
}
