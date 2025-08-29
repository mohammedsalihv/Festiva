import { IReview } from "../../../../domain/entities/modelInterface/base/interface.review";
import { IHostReviewsRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.hostReviewsRepository";
import { IHostRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostRepository";
import { IHostReviewsUseCase } from "../../../../domain/usecaseInterface/host/accountUsecaseInterfaces/interface.hostReviewsUseCase";
import { IHostUseCase } from "../../../../domain/usecaseInterface/host/baseUsecaseInterfaces/interface.hostUseCase";

export class HostReviewsUseCase implements IHostReviewsUseCase {
  constructor(
    private _hostReviewsRepository: IHostReviewsRepository,
    private _hostRepository : IHostRepository
  ) {}
  
  async createdReviews(
    hostId: string,
    page: number,
    limit: number,
    status?: string
  ): Promise<{ reviews: IReview[]; totalPages: number }> {

    const result =  await this._hostReviewsRepository.reviews(
      hostId,
      page,
      limit,
      status
    );

    return { reviews : result , totalPages}
  }

}
