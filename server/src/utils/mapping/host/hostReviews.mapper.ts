import { IReview } from "../../../domain/entities/modelInterface/base/interface.review";
import { IUserModel } from "../../../domain/entities/modelInterface/user/interface.user";
import { hostReviewsResponse } from "../../../domain/entities/modelInterface/base/interface.review";

export const mapHostReviews = (
  reviews: IReview[],
  users: IUserModel[]
): hostReviewsResponse[] => {
  return reviews.map((review) => {
    const user = users.find(
      (u) => u.id?.toString() === review.createrId.toString()
    );

    return {
      _id: review._id ? review._id.toString() : "",
      createrName: user ? `${user.firstname} ${user.lastname}` : "Unknown",
      createrProfilePic: user?.profilePic ?? "",
      createrRole: user?.role ?? "user",
      rating: review.rating,
      review: review.comment,
      assetType:review.assetType
    };
  });
};
