import { IReview } from "../../../../domain/entities/databaseModelInterfaces/baseModelInterfaces/interface.review";
import { IReviewUseCase } from "../../../../domain/usecaseInterface/base/review/interface.reviewUsecase";
import { IReviewRepository } from "../../../../domain/entities/repositoryInterface/base/interface.reviewRepository";

export class ReviewUseCase implements IReviewUseCase {
  constructor(private _reviewRepository: IReviewRepository) {}
  async newReview(review: IReview): Promise<boolean> {
    return await this._reviewRepository.addReview(review);
  }
}
