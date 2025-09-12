import { hostReviewsResponse } from "../../../entities/databaseModelInterfaces/baseModelInterfaces/interface.review";

export interface IHostReviewsUseCase {
  createdReviews(
    hostId: string,
    page: number,
    limit: number,
    status?: string
  ): Promise<{ reviews: hostReviewsResponse[]; totalPages: number }>;
}
