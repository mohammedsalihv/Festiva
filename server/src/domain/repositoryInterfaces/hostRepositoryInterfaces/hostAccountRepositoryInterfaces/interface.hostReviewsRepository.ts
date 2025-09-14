import { IReview } from "../../../entities/databaseModelInterfaces/baseModelInterfaces/interface.review";
export interface IHostReviewsRepository {
  reviews(
    hostId: string,
    page: number,
    limit: number,
    status?: string
  ): Promise<{
    reviews: IReview[];
    totalPages: number;
  }>;
}
