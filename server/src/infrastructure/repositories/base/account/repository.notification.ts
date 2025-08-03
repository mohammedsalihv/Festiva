import { NotificationModel } from "../../../../domain/models/host/hostFeaturesModels/notificationModel";
import { INotificationRepository } from "../../../../domain/entities/repositoryInterface/base/interface.notificationRepository";
import { CreateAssetNotificationDTO } from "../../../../types/DTO/common/notification";

export class NotificationRepository implements INotificationRepository {
  async create(data: CreateAssetNotificationDTO): Promise<void> {
    await NotificationModel.create({
      ...data,
      isRead: false,
      createdAt: new Date(),
    });
  }

  async getByReceiver(receiverId: string): Promise<any[]> {
    return NotificationModel.find({ receiverId }).sort({ createdAt: -1 });
  }
}
