import { NotificationModel } from "../../../../domain/entities/databaseModels/baseModels/baseServicesModels/notificationModel";
import { INotificationRepository } from "../../../../domain/repositoryInterfaces/baseRepositoryInterfaces/baseServicesRepositoryInterfaces/interface.notificationRepository";
import { CreateAssetNotificationDTO } from "../../../../types/DTO's/baseDTO's/notification";
import { INotification } from "../../../../domain/baseInterfaces/baseServicesInterfaces/interface.notification";

export class NotificationRepository implements INotificationRepository {
  async create(data: CreateAssetNotificationDTO): Promise<void> {
    await NotificationModel.create({
      ...data,
      isRead: false,
      createdAt: new Date(),
    });
  }

  async getByReceiver(receiverId: string): Promise<INotification[]> {
    return NotificationModel.find({ receiverId }).sort({ createdAt: -1 });
  }

  async getAllNotifications(): Promise<INotification[]> {
    return NotificationModel.find().sort({ createdAt: -1 });
  }
}
