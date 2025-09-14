import { IReview } from "../../../../domain/entities/databaseModelInterfaces/baseModelInterfaces/interface.review";
import { IHostReviewsRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostAccountRepositoryInterfaces/interface.hostReviewsRepository";
import { reviewModel } from "../../../../domain/entities/databaseModels/baseModels/baseReviewModels/reviewModel";

export class HostReviewsRepository implements IHostReviewsRepository {
  async reviews(
    hostId: string,
    page: number,
    limit: number,
    status?: string
  ): Promise<{ reviews: IReview[]; totalPages: number }> {
    const skip = (page - 1) * limit;
    const query: any = { receiverId: hostId };
    if (status) query.status = status;
    const [reviews, total] = await Promise.all([
      reviewModel
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
      reviewModel.countDocuments(query),
    ]);
    const totalPages = Math.ceil(total / limit);
    return { reviews: reviews as IReview[], totalPages };
  }
}
