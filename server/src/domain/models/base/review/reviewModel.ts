import mongoose, { Schema } from "mongoose";
import { IReview } from "../../../entities/modelInterface/base/interface.review";

const reviewSchema = new Schema<IReview>({
  createrId: { type: Schema.Types.ObjectId },
  receiverId: { type: Schema.Types.ObjectId },
  rating: { type: Number },
  comment: { type: String },
  assetId: { type: Schema.Types.ObjectId },
});

export const reviewModel = mongoose.model<IReview>("Review", reviewSchema);
