import { IReview } from "../../../../domain/entities/modelInterface/base/interface.review";
import { IHostReviewsRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.hostReviewsRepository";
import { IHostReviewsUseCase } from "../../../../domain/usecaseInterface/host/accountUsecaseInterfaces/interface.hostReviewsUseCase";

export class HostReviewsUseCase implements IHostReviewsUseCase {
  constructor(private _hostReviewsRepository: IHostReviewsRepository) {}
  
  async createdReviews(
    hostId: string,
    page: number,
    limit: number,
    status?: string
  ): Promise<{ reviews: IReview[]; totalPages: number }> {
    return await this._hostReviewsRepository.reviews(
      hostId,
      page,
      limit,
      status
    );
  }
}
