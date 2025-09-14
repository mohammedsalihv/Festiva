import { IReview } from "../../../../domain/entities/databaseModelInterfaces/baseModelInterfaces/interface.review";
import { IReviewUseCase } from "../../../../domain/usecaseInterfaces/baseUsecaseInterfaces/baseReviewUsecaseInterfaces/interface.reviewUsecase";
import { IReviewRepository } from "../../../../domain/repositoryInterfaces/baseRepositoryInterfaces/baseServicesRepositoryInterfaces/interface.reviewRepository";

export class ReviewUseCase implements IReviewUseCase {
  constructor(private _reviewRepository: IReviewRepository) {}
  async newReview(review: IReview): Promise<boolean> {
    return await this._reviewRepository.addReview(review);
  }
}
