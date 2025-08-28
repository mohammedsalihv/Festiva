import { IReview } from "../../../entities/modelInterface/base/interface.review";

export interface IHostReviewsUseCase {
  createdReviews(
    hostId: string,
    page: number,
    limit: number,
    status?: string
  ): Promise<{ reviews: IReview[]; totalPages: number }>;
}
