import mongoose, { Schema } from "mongoose";
import { IReview } from "../../../entities/modelInterface/base/interface.review";

const reviewSchema = new Schema<IReview>(
  {
    createrId: { type: Schema.Types.ObjectId, required: true },
    receiverId: { type: Schema.Types.ObjectId, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    assetId: { type: Schema.Types.ObjectId, required: true },
    assetType: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const reviewModel = mongoose.model<IReview>("Review", reviewSchema);
