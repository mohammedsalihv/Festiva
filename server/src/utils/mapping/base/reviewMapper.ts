import { Types } from "mongoose";
import { IReview } from "../../../domain/entities/modelInterface/base/interface.review";
import { reviewRatingPayload } from "../../../types/DTO/common/review";

export function mapReviewPayloadToIReview(
  payload: reviewRatingPayload,
  receiverId: string | Types.ObjectId
): IReview {
  return {
    createrId: new Types.ObjectId(payload.reviewer),
    receiverId,
    rating: payload.stars ?? 0,
    comment: payload.comment ?? "",
    assetId: new Types.ObjectId(payload.assetId),
    assetType: payload.assetType,
    timestamp: new Date().toISOString(),
  };
}
