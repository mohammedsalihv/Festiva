import { IHostNotificationRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostAccountRepositoryInterfaces/interface.hostNotificationRepositoy";
import { NotificationModel } from "../../../../domain/entities/databaseModels/baseModels/baseServicesModels/notificationModel";
import { UserModel } from "../../../../domain/entities/databaseModels/user/userAuthenticationModels/userModel";
import { RentCarModel } from "../../../../domain/entities/databaseModels/hostModels/hostServicesModels/rentCarModel";
import { StudioModel } from "../../../../domain/entities/databaseModels/hostModels/hostServicesModels/studioModel";
import { VenueModel } from "../../../../domain/entities/databaseModels/hostModels/hostServicesModels/venueModel";
import { CatersModel } from "../../../../domain/entities/databaseModels/hostModels/hostServicesModels/catersModel";
import { CreateAssetNotificationDTO } from "../../../../types/DTO's/baseDTO's/notification";

export class HostNotificationRepository implements IHostNotificationRepository {
  async allHostNotifications(receiverId: string): Promise<any[]> {
    const notifications = await NotificationModel.find({
      receiverId,
      isRead: false,
    })
      .sort({ createdAt: -1 })
      .lean();

    const enriched = await Promise.all(
      notifications.map(async (notif) => {
        const creator = await UserModel.findById(notif.createrId)
          .select("firstname lastname email profilePic")
          .lean();

        let asset: any = null;
        switch (notif.assetType) {
          case "rentcar":
            asset = await RentCarModel.findById(notif.assetId)
              .select("businessName carName")
              .lean();
            break;
          case "studio":
            asset = await StudioModel.findById(notif.assetId)
              .select("businessName")
              .lean();
            break;
          case "venue":
            asset = await VenueModel.findById(notif.assetId)
              .select("venueName")
              .lean();
            break;
          case "caters":
            asset = await CatersModel.findById(notif.assetId)
              .select("catersName")
              .lean();
            break;
        }

        return {
          ...notif,
          creator: creator || "Unknown",
          asset,
        };
      })
    );

    return enriched;
  }

  async createNotification(data: CreateAssetNotificationDTO): Promise<void> {
    await NotificationModel.create(data);
  }

  async markAllRead(hostId: string): Promise<void> {
    await NotificationModel.updateMany(
      { receiverId: hostId, isRead: false },
      { $set: { isRead: true } }
    );
  }
}
