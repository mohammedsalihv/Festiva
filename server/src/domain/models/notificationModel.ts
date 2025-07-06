import mongoose, { Schema } from "mongoose";
import { INotification } from "../entities/serviceInterface/interface.notification";

const notificationSchema = new Schema<INotification>(
  {
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "Host",
      required: true,
    },
    assetId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    assetType: {
      type: String,
      enum: ["venue", "rentcar", "studio", "caters"],
      required: true,
    },
    status: {
      type: String,
      enum: ["approved", "rejected"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const NotificationModel = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);
