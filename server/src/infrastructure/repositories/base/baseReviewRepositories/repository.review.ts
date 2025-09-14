import { IReview } from "../../../../domain/entities/databaseModelInterfaces/baseModelInterfaces/interface.review";
import { IReviewRepository } from "../../../../domain/repositoryInterfaces/baseRepositoryInterfaces/baseServicesRepositoryInterfaces/interface.reviewRepository";
import { reviewModel } from "../../../../domain/entities/databaseModels/baseModels/baseReviewModels/reviewModel";

export class ReviewRepository implements IReviewRepository {
  async addReview(reviewDetails: IReview): Promise<boolean> {
    const review = new reviewModel(reviewDetails);
    await review.save();
    return true;
  }
  async getAllReviews(): Promise<IReview[]> {
    return await reviewModel.find().lean();
  }
}
