import mongoose, { Schema } from "mongoose";
import { INotification } from "../../../entities/serviceInterface/base/interface.notification";

const notificationSchema = new Schema<INotification>(
  {
    createrId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "Host",
      required: true,
    },
    assetId: {
      type: Schema.Types.ObjectId,
    },
    assetType: {
      type: String,
      enum: ["venue", "rentcar", "studio", "caters"],
    },
    status: {
      type: String,
      enum: ["approved", "rejected" , "created" ,  "accepted"],
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
