import { hostReviewsResponse } from "../../../../domain/entities/modelInterface/base/interface.review";
import { IHostReviewsRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.hostReviewsRepository";
import { IUserRepository } from "../../../../domain/entities/repositoryInterface/user/account/interface.userRepository";
import { IHostReviewsUseCase } from "../../../../domain/usecaseInterface/host/accountUsecaseInterfaces/interface.hostReviewsUseCase";
import { mapHostReviews } from "../../../../utils/mapping/host/hostReviews.mapper";

export class HostReviewsUseCase implements IHostReviewsUseCase {
  constructor(
    private _hostReviewsRepository: IHostReviewsRepository,
    private _userRepository: IUserRepository
  ) {}

  async createdReviews(
    hostId: string,
    page: number,
    limit: number,
    status?: string
  ): Promise<{ reviews: hostReviewsResponse[]; totalPages: number }> {
    const reviewData = await this._hostReviewsRepository.reviews(
      hostId,
      page,
      limit,
      status
    );
    const userIds = reviewData.reviews.map((review) =>
      review.createrId.toString()
    );
    const users = await this._userRepository.findByIds(userIds);
    if (!users) {
      return { reviews: [], totalPages: reviewData.totalPages };
    }
    const mappedReviews = mapHostReviews(reviewData.reviews, users);
    return { reviews: mappedReviews, totalPages: reviewData.totalPages };
  }
}
