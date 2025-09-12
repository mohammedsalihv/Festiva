import { Types } from "mongoose";
import { IReview } from "../../../domain/entities/databaseModelInterfaces/baseModelInterfaces/interface.review";
import { reviewRatingPayload } from "../../../types/DTO's/baseDTO's/review";

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
